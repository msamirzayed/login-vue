/* eslint-disable no-unused-vars */
import axios from "axios";

export async function patchProfile(uid, profileData) {
  try {
    const allUsers = await getAllUsers();
    for (const userId in allUsers) {
      if (allUsers[userId].uid === uid) {
        await axios.patch(
          `https://veautify-23db0-default-rtdb.firebaseio.com/users/${userId}.json`,
          profileData
        );

        return true;
      }
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
export async function addProfile(uid, profileData) {
  try {
    const allUsers = await getAllUsers();
    for (const userId in allUsers) {
      if (allUsers[userId].uid === uid) {
        await axios.post(
          `https://veautify-23db0-default-rtdb.firebaseio.com/users/${userId}.json`,
          profileData
        );

        return true;
      }
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
export async function getUser(uid) {
  try {
    const allUsers = await getAllUsers();

    for (const userId in allUsers) {
      if (allUsers[userId].uid === uid) {
        return allUsers[userId];
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
export async function getAllUsers() {
  try {
    const response = await axios.get(
      `https://veautify-23db0-default-rtdb.firebaseio.com/users.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}
