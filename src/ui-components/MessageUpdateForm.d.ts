/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Message } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MessageUpdateFormInputValues = {
    textContent?: string;
    imageContent?: string;
    sender?: string;
    chatRoomId?: string;
    senderName?: string;
};
export declare type MessageUpdateFormValidationValues = {
    textContent?: ValidationFunction<string>;
    imageContent?: ValidationFunction<string>;
    sender?: ValidationFunction<string>;
    chatRoomId?: ValidationFunction<string>;
    senderName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessageUpdateFormOverridesProps = {
    MessageUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    textContent?: PrimitiveOverrideProps<TextFieldProps>;
    imageContent?: PrimitiveOverrideProps<TextFieldProps>;
    sender?: PrimitiveOverrideProps<TextFieldProps>;
    chatRoomId?: PrimitiveOverrideProps<TextFieldProps>;
    senderName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MessageUpdateFormProps = React.PropsWithChildren<{
    overrides?: MessageUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    message?: Message;
    onSubmit?: (fields: MessageUpdateFormInputValues) => MessageUpdateFormInputValues;
    onSuccess?: (fields: MessageUpdateFormInputValues) => void;
    onError?: (fields: MessageUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessageUpdateFormInputValues) => MessageUpdateFormInputValues;
    onValidate?: MessageUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MessageUpdateForm(props: MessageUpdateFormProps): React.ReactElement;
