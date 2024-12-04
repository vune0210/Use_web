export interface SettingConfiguration {
    integerTypeSettings: IntegerTypeSettings;
    stringTypeSettings: StringTypeSettings;
    realTypeSettings: RealTypeSettings;
    optionSettings: OptionSettings;
    classSettings: Record<string, ClassSettings>
    associationSettings: Record<string, AssociationSettings>
    invariantSettings: Record<string, InvariantSettings>
}

export interface IntegerTypeSettings {
    minimum: number;
    maximum: number;
    enabled: boolean;
    values: string[];
}

export type RealTypeSettings = {
    minimum: number;
    maximum: number;
    enabled: boolean;
    values: string[];
}

export interface StringTypeSettings extends InstanceSettings {
    enabled: boolean;
}

export interface InstanceSettings {
    lowerBound: number;
    upperBound: number;
    instanceNames: string[];
}

export interface OptionSettings {
    aggregationcyclefreeness: boolean;
    forbiddensharing: boolean;
}

export interface ClassSettings extends InstanceSettings {
    attributeSettings: Record<string, AttributeSettings>;
}

export interface AttributeSettings extends InstanceSettings {
    collectionSizeMin: number;
    collectionSizeMax: number;
}

export interface AssociationSettings extends InstanceSettings {

}

export interface InvariantSettings {
    active: boolean;
    negate: boolean;
}