/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { ChatRoom } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ChatRoomCreateForm(props) {
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
    name: "",
    type: "",
    admins: "",
    participants: "",
    eventId: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [type, setType] = React.useState(initialValues.type);
  const [admins, setAdmins] = React.useState(initialValues.admins);
  const [participants, setParticipants] = React.useState(
    initialValues.participants
  );
  const [eventId, setEventId] = React.useState(initialValues.eventId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setType(initialValues.type);
    setAdmins(initialValues.admins);
    setParticipants(initialValues.participants);
    setEventId(initialValues.eventId);
    setErrors({});
  };
  const validations = {
    name: [],
    type: [],
    admins: [],
    participants: [],
    eventId: [],
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
          name,
          type,
          admins,
          participants,
          eventId,
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
          await DataStore.save(new ChatRoom(modelFields));
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
      {...getOverrideProps(overrides, "ChatRoomCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              type,
              admins,
              participants,
              eventId,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type: value,
              admins,
              participants,
              eventId,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Admins"
        isRequired={false}
        isReadOnly={false}
        value={admins}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              admins: value,
              participants,
              eventId,
            };
            const result = onChange(modelFields);
            value = result?.admins ?? value;
          }
          if (errors.admins?.hasError) {
            runValidationTasks("admins", value);
          }
          setAdmins(value);
        }}
        onBlur={() => runValidationTasks("admins", admins)}
        errorMessage={errors.admins?.errorMessage}
        hasError={errors.admins?.hasError}
        {...getOverrideProps(overrides, "admins")}
      ></TextField>
      <TextField
        label="Participants"
        isRequired={false}
        isReadOnly={false}
        value={participants}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              admins,
              participants: value,
              eventId,
            };
            const result = onChange(modelFields);
            value = result?.participants ?? value;
          }
          if (errors.participants?.hasError) {
            runValidationTasks("participants", value);
          }
          setParticipants(value);
        }}
        onBlur={() => runValidationTasks("participants", participants)}
        errorMessage={errors.participants?.errorMessage}
        hasError={errors.participants?.hasError}
        {...getOverrideProps(overrides, "participants")}
      ></TextField>
      <TextField
        label="Event id"
        isRequired={false}
        isReadOnly={false}
        value={eventId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              admins,
              participants,
              eventId: value,
            };
            const result = onChange(modelFields);
            value = result?.eventId ?? value;
          }
          if (errors.eventId?.hasError) {
            runValidationTasks("eventId", value);
          }
          setEventId(value);
        }}
        onBlur={() => runValidationTasks("eventId", eventId)}
        errorMessage={errors.eventId?.errorMessage}
        hasError={errors.eventId?.hasError}
        {...getOverrideProps(overrides, "eventId")}
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
