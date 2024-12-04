package org.tzi.use.usebackend.controller.state;

import org.tzi.use.config.Options;
import org.tzi.use.uml.mm.MClassInvariant;
import org.tzi.use.uml.mm.MModel;
import org.tzi.use.uml.ocl.expr.Evaluator;
import org.tzi.use.uml.ocl.expr.MultiplicityViolationException;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.MSystemState;
import org.tzi.use.usebackend.api_resp.state.invariants.ClassInvariantEvalResp;
import org.tzi.use.usebackend.api_resp.state.invariants.EvalResult;
import org.tzi.use.util.NullWriter;

import javax.swing.*;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;


public class ClassInvariantsBE {
    private MSystem fSystem;
    private MModel fModel;

    private MClassInvariant[] fClassInvariants = new MClassInvariant[0];
    private EvalResult[] fValues;
    private CompletableFuture<Boolean> done = new CompletableFuture<>();
    private int progressDone;
    private int progressTotal;

    private InvWorker worker = null;
    private ExecutorService executor = Executors.newFixedThreadPool(Options.EVAL_NUMTHREADS);

    private class InvWorker extends SwingWorker<Void,Integer> {

        private String labelText;

        int numFailures = 0;
        int progress = 0;
        int progressEnd = 0;
        long duration = 0;
        boolean structureOK = true;

        // determines if the MultiplicityViolation Label should be shown
        boolean violationLabel = false;

        MSystemState systemState;

        protected synchronized int incrementProgress() {
            return ++progress;
        }

        public InvWorker() {
            systemState = fSystem.state();
        }

        @Override
        protected Void doInBackground() throws Exception {
            long start = System.currentTimeMillis();

            progressEnd = fClassInvariants.length;
            clearValues();

            // check invariants
            if (Options.EVAL_NUMTHREADS > 1)
                labelText = "Working (using " + Options.EVAL_NUMTHREADS + " concurrent threads)...";
            else
                labelText = "Working...";

            publish(0);

            List<Future<EvalResult>> futures = new ArrayList<Future<EvalResult>>();
            ExecutorCompletionService<EvalResult> ecs = new ExecutorCompletionService<EvalResult>(executor);

            for (int i = 0; i < fClassInvariants.length; i++) {
                if(!fClassInvariants[i].isActive()){
                    continue;
                }
                InvWorker.MyEvaluatorCallable cb = new InvWorker.MyEvaluatorCallable(systemState, i, fClassInvariants[i]);
                futures.add(ecs.submit(cb));
            }

            for (int i = 0; i < fClassInvariants.length && !isCancelled(); i++) {
                if(!fClassInvariants[i].isActive()){
                    continue;
                }
                try {
                    EvalResult res = ecs.take().get();
                    fValues[res.index] = res;
                    publish(incrementProgress());

                    boolean ok = false;
                    // if v == null it is not considered as a failure, rather it is
                    // a MultiplicityViolation and it is skipped as failure count
                    boolean skip = false;
                    if (!res.resultIsNull()) {
                        ok = res.resultBool;
                    } else {
                        violationLabel = true;
                        skip = true;
                    }

                    if (!skip && !ok)
                        numFailures++;

                } catch (InterruptedException ex) {
                    break;
                }
            }

            for (Future<EvalResult> f : futures) {
                f.cancel(true);
            }

            structureOK = systemState.checkStructure(new PrintWriter(new NullWriter()), false);

            duration = System.currentTimeMillis() - start;
            return null;
        }

        @Override
        protected void process(List<Integer> chunks) {
            int lastProgress = chunks.get(chunks.size() - 1);

//            fLabel.setForeground(Color.black);
//            fLabel.setText(labelText);
//
//            fProgressBar.setMaximum(progressEnd);
//            fProgressBar.setValue(lastProgress);
//            fMyTableModel.fireTableDataChanged();
//
//            repaint();
        }

        @Override
        protected void done() {
            done.complete(true);
//            setOpenEvalBrowserEnabled(true);
//
//            String text;
//
//            // show summary of results
//            if (numFailures == 0) {
//                if (violationLabel) {
//                    fLabel.setForeground(Color.red);
//                    text = "Model inherent constraints violated (see Log for details).";
//                } else {
//                    fLabel.setForeground(Color.black);
//                    text = "Constrs. OK.";
//                }
//            } else {
//                fLabel.setForeground(Color.red);
//                text = numFailures + " constraint" + ((numFailures > 1) ? "s" : "") + " failed.";
//            }
//
//            if(numFailures == 0 && structureOK && !violationLabel){
//                fLabel.setForeground(Color.black);
//                text = "Cnstrs. OK.";
//            } else if (numFailures == 0 && violationLabel){
//                fLabel.setForeground(Color.red);
//                text = "Model inherent constraints violated (see Log for details).";
//            } else if(numFailures == 0 && !structureOK){
//                fLabel.setForeground(Color.red);
//                text = "Explicit cnstrs. OK. Inherent cnstrs. failed.";
//            } else {
//                fLabel.setForeground(Color.red);
//                text = numFailures + " cnstr" + ((numFailures > 1) ? "s" : "") + ". failed.";
//                text = text + " Inherent cnstrs. " + (structureOK?"OK":"failed") + ".";
//            }
//
//            text = text + String.format(" (%,dms)", duration);
//
//            fLabel.setText(text);
//            fProgressBar.setMaximum(1);
//            fProgressBar.setValue(1);
//            fMyTableModel.fireTableDataChanged();
//
//            setCursor(Cursor.getDefaultCursor());
        }

        private class MyEvaluatorCallable implements Callable<EvalResult> {
            final int index;
            final MSystemState state;
            final MClassInvariant inv;

            public MyEvaluatorCallable(MSystemState state, int index, MClassInvariant inv) {
                this.state = state;
                this.index = index;
                this.inv = inv;
            }

            @Override
            public EvalResult call() throws Exception {
                if (isCancelled()) return null;

                Evaluator eval = new Evaluator();
                Value v = null;
                String message = null;
                long start = System.currentTimeMillis();

                try {
                    v = eval.eval(inv.flaggedExpression(), state);
                } catch (MultiplicityViolationException e) {
                    message = e.getMessage();
                }

                return new EvalResult(index, v, message, System.currentTimeMillis() - start);
            }
        }
    }

    public ClassInvariantsBE(MSystem fSystem) {
        this.fSystem = fSystem;
        this.fModel = fSystem.model();
    }

    private void init() {
        int n = fModel.classInvariants().size();

        // initialize array of class invariants
        fClassInvariants = new MClassInvariant[n];
        System.arraycopy(fModel.classInvariants().toArray(), 0,
                fClassInvariants, 0, n);
        Arrays.sort(fClassInvariants);

        // initialize value array to undefined values
        fValues = new EvalResult[n];
        clearValues();

//        fProgressBar.setMinimum(0);
//        fProgressBar.setMaximum(n);
    }

    private synchronized void update() {
//        setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));

        if (worker != null) {
            if(!worker.isDone()) {
                worker.cancel(false);
            }
        }

        worker = new InvWorker();
        worker.execute();
    }

    private void clearValues() {
        for (int i = 0; i < fValues.length; i++)
            fValues[i] = null;
    }

    public void detachModel() {
        fSystem.getEventBus().unregister(this);
        if(!worker.isDone()){
            worker.cancel(false);
        }
        executor.shutdown();
    }

    public ClassInvariantEvalResp run() throws ExecutionException, InterruptedException {
        this.init();
        this.update();
        done.get(); // wait worker done
        return new ClassInvariantEvalResp(this.fClassInvariants, this.fValues, worker.structureOK);
    }
}
