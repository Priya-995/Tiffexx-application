import { cuisines } from "@/lib/data";

export default function Cuisines() {
  return (
    <section className="section" aria-labelledby="cuisine-title">
      <div className="sec-head">
        <h2 id="cuisine-title">Shop by cuisine</h2>
      </div>
      <div className="cuisines" id="cuisines">
        {cuisines.map((c) => (
          <a className="cuisine" href="#" key={c.name}>
            <div className="cuisine__img">
              <img src={c.img} alt="" style={c.fit ? { objectFit: c.fit } : undefined} />
            </div>
            <span>{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
