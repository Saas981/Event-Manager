/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserCreateForm(props) {
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
    email: "",
    name: "",
    phone: "",
    username: "",
    profilePicture: "",
    friends: "",
    accountStatus: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [name, setName] = React.useState(initialValues.name);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [username, setUsername] = React.useState(initialValues.username);
  const [profilePicture, setProfilePicture] = React.useState(
    initialValues.profilePicture
  );
  const [friends, setFriends] = React.useState(initialValues.friends);
  const [accountStatus, setAccountStatus] = React.useState(
    initialValues.accountStatus
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setName(initialValues.name);
    setPhone(initialValues.phone);
    setUsername(initialValues.username);
    setProfilePicture(initialValues.profilePicture);
    setFriends(initialValues.friends);
    setAccountStatus(initialValues.accountStatus);
    setErrors({});
  };
  const validations = {
    email: [{ type: "Email" }],
    name: [],
    phone: [{ type: "Phone" }],
    username: [],
    profilePicture: [],
    friends: [],
    accountStatus: [],
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
          email,
          name,
          phone,
          username,
          profilePicture,
          friends,
          accountStatus,
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
          await DataStore.save(new User(modelFields));
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
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              name,
              phone,
              username,
              profilePicture,
              friends,
              accountStatus,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name: value,
              phone,
              username,
              profilePicture,
              friends,
              accountStatus,
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
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              phone: value,
              username,
              profilePicture,
              friends,
              accountStatus,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              phone,
              username: value,
              profilePicture,
              friends,
              accountStatus,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={profilePicture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              phone,
              username,
              profilePicture: value,
              friends,
              accountStatus,
            };
            const result = onChange(modelFields);
            value = result?.profilePicture ?? value;
          }
          if (errors.profilePicture?.hasError) {
            runValidationTasks("profilePicture", value);
          }
          setProfilePicture(value);
        }}
        onBlur={() => runValidationTasks("profilePicture", profilePicture)}
        errorMessage={errors.profilePicture?.errorMessage}
        hasError={errors.profilePicture?.hasError}
        {...getOverrideProps(overrides, "profilePicture")}
      ></TextField>
      <TextField
        label="Friends"
        isRequired={false}
        isReadOnly={false}
        value={friends}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              phone,
              username,
              profilePicture,
              friends: value,
              accountStatus,
            };
            const result = onChange(modelFields);
            value = result?.friends ?? value;
          }
          if (errors.friends?.hasError) {
            runValidationTasks("friends", value);
          }
          setFriends(value);
        }}
        onBlur={() => runValidationTasks("friends", friends)}
        errorMessage={errors.friends?.errorMessage}
        hasError={errors.friends?.hasError}
        {...getOverrideProps(overrides, "friends")}
      ></TextField>
      <TextField
        label="Account status"
        isRequired={false}
        isReadOnly={false}
        value={accountStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              phone,
              username,
              profilePicture,
              friends,
              accountStatus: value,
            };
            const result = onChange(modelFields);
            value = result?.accountStatus ?? value;
          }
          if (errors.accountStatus?.hasError) {
            runValidationTasks("accountStatus", value);
          }
          setAccountStatus(value);
        }}
        onBlur={() => runValidationTasks("accountStatus", accountStatus)}
        errorMessage={errors.accountStatus?.errorMessage}
        hasError={errors.accountStatus?.hasError}
        {...getOverrideProps(overrides, "accountStatus")}
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
