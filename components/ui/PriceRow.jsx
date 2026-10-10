export default function PriceRow({ price, oldPrice }) {
  return (
    <div className="price">
      <b>{price}</b>
      <small>/day</small>
      <s>{oldPrice}</s>
    </div>
  );
}
