export default class OffersModel {
  #service;
  #offers;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    const foundOffers = this.#offers.find((offer) => offer.type === type).offers;
    return foundOffers || null;
  }
}
