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
export declare type ChatRoomCreateFormInputValues = {
    name?: string;
    type?: string;
    admins?: string;
    participants?: string;
    eventId?: string;
};
export declare type ChatRoomCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    admins?: ValidationFunction<string>;
    participants?: ValidationFunction<string>;
    eventId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatRoomCreateFormOverridesProps = {
    ChatRoomCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    admins?: PrimitiveOverrideProps<TextFieldProps>;
    participants?: PrimitiveOverrideProps<TextFieldProps>;
    eventId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatRoomCreateFormProps = React.PropsWithChildren<{
    overrides?: ChatRoomCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChatRoomCreateFormInputValues) => ChatRoomCreateFormInputValues;
    onSuccess?: (fields: ChatRoomCreateFormInputValues) => void;
    onError?: (fields: ChatRoomCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatRoomCreateFormInputValues) => ChatRoomCreateFormInputValues;
    onValidate?: ChatRoomCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChatRoomCreateForm(props: ChatRoomCreateFormProps): React.ReactElement;
