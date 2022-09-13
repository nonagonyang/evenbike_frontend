import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
class EvenBikeApi {
  // the token for interactive with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${EvenBikeApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**Trip realted API calls */

  /** Get recommended bike docks based on a given location. */

  static async getDockOptions(coordinate, type) {
    let res = await this.request(`trip/docks/${JSON.stringify(coordinate)}`);
    if (type === "from") {
      res.docks.reverse();
    }
    return res.docks;
  }

  static async startTrip(startDock, startTime) {
    const start_dock = startDock;
    const start_time = startTime;
    let res = await this.request(
      "trip/start",
      { start_dock, start_time },
      "post"
    );
    return res.trip;
  }

  static async endTrip(endDock, endTime, tripId) {
    const end_dock = endDock;
    const end_time = endTime;
    let res = await this.request(
      `trip/end/${tripId}`,
      { end_dock, end_time },
      "patch"
    );
    return res;
  }

  static async getTrips(username) {
    let res = await this.request(`trip/trips/${username}`);
    return res.trips;
  }

  /**End of Trip related API calls */

  /** authentication related API calls  */
  static async login(userInput) {
    let res = await this.request(`auth/token`, userInput, "post");
    return res.token;
  }

  static async register(userInput) {
    let res = await this.request(`auth/register`, userInput, "post");
    return res.token;
  }
  /** End of authentication related API calls  */

  /** On APP load get user data */
  static async getUser(username) {
    let res = await this.request(`profile/${username}`);
    return res.user;
  }
}

export default EvenBikeApi;
