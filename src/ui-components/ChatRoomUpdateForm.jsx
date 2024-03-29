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
export default function ChatRoomUpdateForm(props) {
  const {
    id: idProp,
    chatRoom: chatRoomModelProp,
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
    settings: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [type, setType] = React.useState(initialValues.type);
  const [admins, setAdmins] = React.useState(initialValues.admins);
  const [participants, setParticipants] = React.useState(
    initialValues.participants
  );
  const [eventId, setEventId] = React.useState(initialValues.eventId);
  const [settings, setSettings] = React.useState(initialValues.settings);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = chatRoomRecord
      ? { ...initialValues, ...chatRoomRecord }
      : initialValues;
    setName(cleanValues.name);
    setType(cleanValues.type);
    setAdmins(cleanValues.admins);
    setParticipants(cleanValues.participants);
    setEventId(cleanValues.eventId);
    setSettings(cleanValues.settings);
    setErrors({});
  };
  const [chatRoomRecord, setChatRoomRecord] = React.useState(chatRoomModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(ChatRoom, idProp)
        : chatRoomModelProp;
      setChatRoomRecord(record);
    };
    queryData();
  }, [idProp, chatRoomModelProp]);
  React.useEffect(resetStateValues, [chatRoomRecord]);
  const validations = {
    name: [],
    type: [],
    admins: [],
    participants: [],
    eventId: [],
    settings: [],
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
          settings,
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
          await DataStore.save(
            ChatRoom.copyOf(chatRoomRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ChatRoomUpdateForm")}
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
              settings,
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
              settings,
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
              settings,
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
              settings,
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
              settings,
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
      <TextField
        label="Settings"
        isRequired={false}
        isReadOnly={false}
        value={settings}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              admins,
              participants,
              eventId,
              settings: value,
            };
            const result = onChange(modelFields);
            value = result?.settings ?? value;
          }
          if (errors.settings?.hasError) {
            runValidationTasks("settings", value);
          }
          setSettings(value);
        }}
        onBlur={() => runValidationTasks("settings", settings)}
        errorMessage={errors.settings?.errorMessage}
        hasError={errors.settings?.hasError}
        {...getOverrideProps(overrides, "settings")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || chatRoomModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || chatRoomModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
