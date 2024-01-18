module.exports = {
  get_item_img: async (id) => {
    const itemObj = await fetch(`/api/items/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  }).then ((response) => response.json());

  return itemObj.filename;
  },
  get_item_name: async (id) => {
    const itemObj = await fetch(`/api/items/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  }).then ((response) => response.json());

  return itemObj.name;
  },
  get_user_steamId: async (id) => {
    const userObj = await fetch(`/api/users/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  }).then ((response) => response.json());

  return userObj.steamId;
  },
  get_user_name: async (id) => {
    const userObj = await fetch(`/api/users/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  }).then ((response) => response.json());
  console.log(userObj);
  return userObj.fullName;
  },
};
