import Client from './api'

export const NewBookmarkRecipe = async (data) => {
  try {
    const res = await Client.post(`/savedrecipes`, data)
    return res.data
  } catch (e) {
    throw e
  }
}

export const GetUserBookmarkRecipes = async (userid) => {
  try {
    const res = await Client.get(`/savedrecipes/${userid}`)
    return res.data
  } catch (e) {
    throw e
  }
}

export const GetApiSavedRecipe = async (apiId, userId) => {
  try {
    const res = await Client.get(`/savedrecipes/details/${apiId}/${userId}`)
    return res.data
  } catch (e) {
    throw e
  }
}

export const DeleteUserBookmark = async (apiId) => {
  try {
    const res = await Client.delete(`/savedrecipes/delete/${apiId}`)
    return res.data
  } catch (e) {
    throw e
  }
}
