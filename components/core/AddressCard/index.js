import styles from "./addressCard.module.css";

import Button from "../Button";

const AddressCard = ({
  addressObject = {
    addressString: "Your address here",
    ameneties: [],
    name: "Your address name",
    price: "$0.0",
    type: "Address type",
    floorplan: {
      rooms: 1,
      baths: 1,
    },
  },
  handleDelete = () => {},
}) => {
  const { addressString, ameneties, name, price, type, floorplan, id } =
    addressObject;

  return (
    <div className={styles.component_container}>
      <section className={styles.name_price_container}>
        <div className={styles.name_wrapper}>{name}</div>
        <div className={styles.price_wrapper}>${price}</div>
      </section>
      <section className={styles.type_wrapper}>{type}</section>
      <section className={styles.address_container}>{addressString}</section>
      <section className={styles.floorplan_wrapper}>
        <span>{floorplan.rooms} rooms</span>
        <span>{floorplan.baths} baths</span>
      </section>
      <section className={styles.ameneties_wrapper}>
        {!!ameneties.length &&
          ameneties.map((amenity) => <span key={amenity}>{amenity}</span>)}
      </section>
      <section className={styles.user_action_container}>
        <Button
          label="delete"
          variant="secondary"
          onClick={() => handleDelete(id)}
        />
      </section>
    </div>
  );
};

export default AddressCard;
