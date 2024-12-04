import {GithubFilled} from "@ant-design/icons";
import {Button, Result} from "antd";

export function AppErrorBoundaryView() {
    return (
        <Result
            status="500"
            title="USE Web Client Error"
            subTitle={
                <>
                    <div>Sorry, something went wrong with USE web client.</div>
                    <div>
                        Please contact
                        <Button
                            type="link"
                            icon={<GithubFilled/>}
                            href="https://github.com/phamngocduy98"
                        >
                            @phamngocduy98
                        </Button>
                    </div>
                </>
            }
            extra={
                <Button type="primary" onClick={() => window.location.reload()}>
                    Reload
                </Button>
            }
        />
    );
}

export function DefaultErrorBoundaryView() {
    return (
        <Result
            status="warning"
            title="Something went wrong with this view"
            // extra={
            //   <Button type="primary" onClick={() => window.location.reload()}>
            //     Reload
            //   </Button>
            // }
        />
    );
}
