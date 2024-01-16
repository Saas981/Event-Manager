/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Message } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MessageCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    textContent: "",
    imageContent: "",
    sender: "",
    chatRoomID: "",
  };
  const [textContent, setTextContent] = React.useState(
    initialValues.textContent
  );
  const [imageContent, setImageContent] = React.useState(
    initialValues.imageContent
  );
  const [sender, setSender] = React.useState(initialValues.sender);
  const [chatRoomID, setChatRoomID] = React.useState(initialValues.chatRoomID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTextContent(initialValues.textContent);
    setImageContent(initialValues.imageContent);
    setSender(initialValues.sender);
    setChatRoomID(initialValues.chatRoomID);
    setErrors({});
  };
  const validations = {
    textContent: [],
    imageContent: [],
    sender: [],
    chatRoomID: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          textContent,
          imageContent,
          sender,
          chatRoomID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Message(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "MessageCreateForm")}
      {...rest}
    >
      <TextField
        label="Text content"
        isRequired={false}
        isReadOnly={false}
        value={textContent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              textContent: value,
              imageContent,
              sender,
              chatRoomID,
            };
            const result = onChange(modelFields);
            value = result?.textContent ?? value;
          }
          if (errors.textContent?.hasError) {
            runValidationTasks("textContent", value);
          }
          setTextContent(value);
        }}
        onBlur={() => runValidationTasks("textContent", textContent)}
        errorMessage={errors.textContent?.errorMessage}
        hasError={errors.textContent?.hasError}
        {...getOverrideProps(overrides, "textContent")}
      ></TextField>
      <TextField
        label="Image content"
        isRequired={false}
        isReadOnly={false}
        value={imageContent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              textContent,
              imageContent: value,
              sender,
              chatRoomID,
            };
            const result = onChange(modelFields);
            value = result?.imageContent ?? value;
          }
          if (errors.imageContent?.hasError) {
            runValidationTasks("imageContent", value);
          }
          setImageContent(value);
        }}
        onBlur={() => runValidationTasks("imageContent", imageContent)}
        errorMessage={errors.imageContent?.errorMessage}
        hasError={errors.imageContent?.hasError}
        {...getOverrideProps(overrides, "imageContent")}
      ></TextField>
      <TextField
        label="Sender"
        isRequired={false}
        isReadOnly={false}
        value={sender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              textContent,
              imageContent,
              sender: value,
              chatRoomID,
            };
            const result = onChange(modelFields);
            value = result?.sender ?? value;
          }
          if (errors.sender?.hasError) {
            runValidationTasks("sender", value);
          }
          setSender(value);
        }}
        onBlur={() => runValidationTasks("sender", sender)}
        errorMessage={errors.sender?.errorMessage}
        hasError={errors.sender?.hasError}
        {...getOverrideProps(overrides, "sender")}
      ></TextField>
      <TextField
        label="Chat room id"
        isRequired={true}
        isReadOnly={false}
        value={chatRoomID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              textContent,
              imageContent,
              sender,
              chatRoomID: value,
            };
            const result = onChange(modelFields);
            value = result?.chatRoomID ?? value;
          }
          if (errors.chatRoomID?.hasError) {
            runValidationTasks("chatRoomID", value);
          }
          setChatRoomID(value);
        }}
        onBlur={() => runValidationTasks("chatRoomID", chatRoomID)}
        errorMessage={errors.chatRoomID?.errorMessage}
        hasError={errors.chatRoomID?.hasError}
        {...getOverrideProps(overrides, "chatRoomID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
