/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotificationCreateFormInputValues = {
    sender?: string;
    recepient?: string;
    type?: string;
    message?: string;
    status?: string;
    other?: string;
};
export declare type NotificationCreateFormValidationValues = {
    sender?: ValidationFunction<string>;
    recepient?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    other?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationCreateFormOverridesProps = {
    NotificationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sender?: PrimitiveOverrideProps<TextFieldProps>;
    recepient?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    other?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationCreateFormProps = React.PropsWithChildren<{
    overrides?: NotificationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onSuccess?: (fields: NotificationCreateFormInputValues) => void;
    onError?: (fields: NotificationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onValidate?: NotificationCreateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationCreateForm(props: NotificationCreateFormProps): React.ReactElement;
