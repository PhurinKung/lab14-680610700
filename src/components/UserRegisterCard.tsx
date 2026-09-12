import type { Registrant } from "../libs/Registrant";

const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function UserRegisterCard(registrant: Registrant) {
  // registrant.gender === "male"   -> "👨 Male"
  // registrant.gender === "female" -> "👩 Female"
  return <div className="card p-3">
    <div className="d-flex justify-content-between">
      <span className="fw-semibold">{registrant.fullName}</span>
      <span>{registrant.total.toLocaleString()} THB</span>
    </div>

    <div className="text-muted small">
      { registrant.plan}
      { registrant.gender === "male" ? " · 👨 Male" : " · 👩 Female" }
    </div>

    <div className="mt-1 d-flex flex-wrap gap-1">
      {registrant.items.map((itemId: string) => {
          // Find the matching item from the extraItems array to get the label
          const itemDef = extraItems.find((item) => item.id === itemId);
          if (!itemDef) return null;

          return (
            <span key={itemId} className="badge text-bg-light border">
              {itemDef.label}
            </span>
          );
        })}
    </div>
  </div>;
}
