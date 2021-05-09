export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message
    };
    const response = await fetch(`https://genial-smoke-302213-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch');
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', responseData);
  },
  async fetchRequests(context){
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(`https://genial-smoke-302213-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to get requests');
    }

    const requests = [];

    for(const key in responseData){
      const requestData = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      };
      requests.push(requestData)
    }

    context.commit('setRequests', requests)
  }
};
