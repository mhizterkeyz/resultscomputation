const api_url = process.env.API_URL || "http://localhost:3001";

const handle_response = async (response) => {
  if (response.status === 200) return (await response.json()).data;
  return false;
};

export const login = async (cred) => {
  try {
    const response = await fetch(`${api_url}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await handle_response(response);
  } catch (err) {
    return new Error(err);
  }
};

export const verify = async (accessToken) => {
  try {
    const response = await fetch(
      `${api_url}/api/verify_access_token?access_token=${
        accessToken || localStorage["resultify_access_token"]
      }`
    );
    return await handle_response(response);
  } catch (err) {
    return new Error(err);
  }
};

export const verify_invite = async (invite) => {
  try {
    const response = await fetch(`${api_url}/api/verifyinvite/${invite}`);
    return await handle_response(response);
  } catch (err) {
    return new Error(err);
  }
};

export const verify_cred = async (cred) => {
  try {
    const response = await fetch(`${api_url}/api/verify_cred/${cred}`);
    return await handle_response(response);
  } catch (err) {
    return new Error(err);
  }
};

export const sign_up = async (data) => {
  const route = data.validation_level.toLowerCase();
  try {
    const response = await fetch(`${api_url}/api/${route}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return new Error(err);
  }
};

//TODO: Move group call to separate file...
export const get_groups = async () => {
  try {
    const response = await fetch(`${api_url}/api/groups`);
    return await handle_response(response);
  } catch (err) {
    return new Error(err);
  }
};
