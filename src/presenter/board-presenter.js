import SortView from '../view/sort-view.js';
import EditList from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #sortComponent = new SortView();
  #editListComponent = new EditList();
  #container = null;
  #destinations = null;
  #offers = null;
  #points = null;

  constructor({ container, destinationsModel, offersModel, pointsModel }) {
    this.#container = container;
    this.#destinations = destinationsModel;
    this.#offers = offersModel;
    this.#points = pointsModel.get();
  }

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#editListComponent, this.#container);
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestinations: this.#destinations.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new FormEditView({
      point,
      pointDestinations: this.#destinations.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type),
      onSunmitClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onResetClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#editListComponent.element);
  }
}

