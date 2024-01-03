/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Event } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function EventUpdateForm(props) {
  const {
    id: idProp,
    event: eventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    startTime: "",
    location: "",
    reoccuring: false,
    endTime: "",
    participants: "",
    capacity: "",
    description: "",
    organizer: "",
    rating: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [location, setLocation] = React.useState(initialValues.location);
  const [reoccuring, setReoccuring] = React.useState(initialValues.reoccuring);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [participants, setParticipants] = React.useState(
    initialValues.participants
  );
  const [capacity, setCapacity] = React.useState(initialValues.capacity);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [organizer, setOrganizer] = React.useState(initialValues.organizer);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventRecord
      ? { ...initialValues, ...eventRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setStartTime(cleanValues.startTime);
    setLocation(cleanValues.location);
    setReoccuring(cleanValues.reoccuring);
    setEndTime(cleanValues.endTime);
    setParticipants(cleanValues.participants);
    setCapacity(cleanValues.capacity);
    setDescription(cleanValues.description);
    setOrganizer(cleanValues.organizer);
    setRating(cleanValues.rating);
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(eventModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Event, idProp)
        : eventModelProp;
      setEventRecord(record);
    };
    queryData();
  }, [idProp, eventModelProp]);
  React.useEffect(resetStateValues, [eventRecord]);
  const validations = {
    title: [],
    startTime: [],
    location: [],
    reoccuring: [],
    endTime: [],
    participants: [],
    capacity: [],
    description: [],
    organizer: [],
    rating: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          title,
          startTime,
          location,
          reoccuring,
          endTime,
          participants,
          capacity,
          description,
          organizer,
          rating,
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
            Event.copyOf(eventRecord, (updated) => {
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
      {...getOverrideProps(overrides, "EventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              startTime,
              location,
              reoccuring,
              endTime,
              participants,
              capacity,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={startTime && convertToLocal(new Date(startTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              startTime: value,
              location,
              reoccuring,
              endTime,
              participants,
              capacity,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.startTime ?? value;
          }
          if (errors.startTime?.hasError) {
            runValidationTasks("startTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("startTime", startTime)}
        errorMessage={errors.startTime?.errorMessage}
        hasError={errors.startTime?.hasError}
        {...getOverrideProps(overrides, "startTime")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location: value,
              reoccuring,
              endTime,
              participants,
              capacity,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <SwitchField
        label="Reoccuring"
        defaultChecked={false}
        isDisabled={false}
        isChecked={reoccuring}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring: value,
              endTime,
              participants,
              capacity,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.reoccuring ?? value;
          }
          if (errors.reoccuring?.hasError) {
            runValidationTasks("reoccuring", value);
          }
          setReoccuring(value);
        }}
        onBlur={() => runValidationTasks("reoccuring", reoccuring)}
        errorMessage={errors.reoccuring?.errorMessage}
        hasError={errors.reoccuring?.hasError}
        {...getOverrideProps(overrides, "reoccuring")}
      ></SwitchField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={endTime && convertToLocal(new Date(endTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring,
              endTime: value,
              participants,
              capacity,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.endTime ?? value;
          }
          if (errors.endTime?.hasError) {
            runValidationTasks("endTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("endTime", endTime)}
        errorMessage={errors.endTime?.errorMessage}
        hasError={errors.endTime?.hasError}
        {...getOverrideProps(overrides, "endTime")}
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
              title,
              startTime,
              location,
              reoccuring,
              endTime,
              participants: value,
              capacity,
              description,
              organizer,
              rating,
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
        label="Capacity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={capacity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring,
              endTime,
              participants,
              capacity: value,
              description,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.capacity ?? value;
          }
          if (errors.capacity?.hasError) {
            runValidationTasks("capacity", value);
          }
          setCapacity(value);
        }}
        onBlur={() => runValidationTasks("capacity", capacity)}
        errorMessage={errors.capacity?.errorMessage}
        hasError={errors.capacity?.hasError}
        {...getOverrideProps(overrides, "capacity")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring,
              endTime,
              participants,
              capacity,
              description: value,
              organizer,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Organizer"
        isRequired={false}
        isReadOnly={false}
        value={organizer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring,
              endTime,
              participants,
              capacity,
              description,
              organizer: value,
              rating,
            };
            const result = onChange(modelFields);
            value = result?.organizer ?? value;
          }
          if (errors.organizer?.hasError) {
            runValidationTasks("organizer", value);
          }
          setOrganizer(value);
        }}
        onBlur={() => runValidationTasks("organizer", organizer)}
        errorMessage={errors.organizer?.errorMessage}
        hasError={errors.organizer?.hasError}
        {...getOverrideProps(overrides, "organizer")}
      ></TextField>
      <TextField
        label="Rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              startTime,
              location,
              reoccuring,
              endTime,
              participants,
              capacity,
              description,
              organizer,
              rating: value,
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks("rating", value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks("rating", rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, "rating")}
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
          isDisabled={!(idProp || eventModelProp)}
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
              !(idProp || eventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
