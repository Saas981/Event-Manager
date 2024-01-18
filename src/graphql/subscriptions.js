/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      email
      name
      phone
      username
      profilePicture
      friends
      accountStatus
      bio
      settings
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      email
      name
      phone
      username
      profilePicture
      friends
      accountStatus
      bio
      settings
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      email
      name
      phone
      username
      profilePicture
      friends
      accountStatus
      bio
      settings
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      title
      startTime
      location
      reoccuring
      endTime
      participants
      capacity
      description
      organizer
      rating
      coverImage
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      title
      startTime
      location
      reoccuring
      endTime
      participants
      capacity
      description
      organizer
      rating
      coverImage
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      title
      startTime
      location
      reoccuring
      endTime
      participants
      capacity
      description
      organizer
      rating
      coverImage
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      textContent
      imageContent
      sender
      chatRoomId
      senderName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      textContent
      imageContent
      sender
      chatRoomId
      senderName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      textContent
      imageContent
      sender
      chatRoomId
      senderName
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      name
      type
      admins
      participants
      eventId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      name
      type
      admins
      participants
      eventId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      name
      type
      admins
      participants
      eventId
      createdAt
      updatedAt
    }
  }
`;
