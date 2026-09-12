import { useState, useEffect } from "react";
import { type Registrant } from "../libs/Registrant";

//---- แผนการวิ่ง ----
type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};

const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

const STORAGE_KEY = "lab14.Register";


// อ่านค่าเก่าจาก localStorage (เก็บได้แค่ string จึงต้อง JSON.parse กลับเป็น array)
function loadData(): Registrant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // เผื่อข้อมูลใน localStorage เสีย
  }
}

export default function ModalRegister({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });

  const [RegisterData, setRegister] = useState<Registrant[]>(loadData);

  useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(RegisterData));
    }, [RegisterData]);

  const handleAdd = () => {
    const name = `${form.fname} ${form.lname}`;
    const planobj = plans.find((p)=> p.id === form.plan);

    const newRegistrant: Registrant = {
      id: RegisterData.length + 1,
      fullName: name,
      gender: form.gender,
      plan: planobj ? planobj.label : form.plan,
      total: computeTotalPayment(),
      items: selectedItems,
    }
    setRegister((prevData) => [...prevData, newRegistrant]);
    
    // setForm();
    // setSelectedItems([]);
    // setAgree(false);
  }
  
  const [agree, setAgree] = useState(false);
  
  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });
  
  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItems = (itemId: string) =>{
    setSelectedItems(
      (items) => {
        //when the box is checked
        if(items.includes(itemId)) return items.filter((id) => id!=itemId); //remove if already in array
        else return [...items, itemId]; //add if not
      });
  };

  const computeExtraItems = () => {
    let costExtraItem = 0;

    selectedItems.forEach((itemId)=> {
      const item = extraItems.find((i)=> i.id === itemId);
      if(item) costExtraItem+= item.price;
    });

    
    return costExtraItem;
  };
  
  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    total+=computeExtraItems();
    if (selectedItems.length === 3) {
      total*=0.8;
    }
    return total;
  };

  const registerBtnOnClick = () => {
  const newErrors = {
    fname: form.fname === "",
    lname: form.lname === "",
    plan: form.plan === "",
    gender: form.gender === "",
  };
  setErrors(newErrors);

  const hasError = Object.values(newErrors).some((isError) => isError);
  if (hasError) return;

  const total = computeTotalPayment();
  alert(
    `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
  );
  handleAdd();
};

  return (
    <div
      className="modal fade show d-block" tabIndex={-1} role="dialog"
      // id="modalregister"
      // data-bs-backdrop="static"
      // data-bs-keyboard="false"
      // tabIndex={-1}
      // aria-labelledby="modalregisterLabel"
      // aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal"
              // aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("fname", e.target.value)}
                    value={form.fname}
                  />

                  <div className="invalid-feedback">Invalid first name</div>
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("lname", e.target.value)}
                    value={form.lname}
                  />

                  <div className="invalid-feedback">Invalid last name</div>
              </div>
            </div>
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  value={form.plan}
                  onChange={(e) => updateForm("plan", e.target.value)}
                >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select>
              <div className="invalid-feedback">Please select a Plan</div>
            </div>
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  checked={form.gender === "male"}
                  onChange={() => updateForm("gender", "male")}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  checked={form.gender === "female"}
                  onChange={() => updateForm("gender", "female")}
                />
                Female 👩
                { errors.gender && <div className="text-danger">Please select gender</div> }
              </div>
            </div>
            {/* Extra Items */}
            <div>
              <label className="form-label">Extra Item(s)</label>
              {
                extraItems.map((i)=> (
                  <div key={i.id} className="form-check">
                    <input 
                      className="me-2 form-check-input" 
                      type="checkbox" 
                      id={i.id}
                      checked={selectedItems.includes(i.id)}
                      onChange={() => toggleItems(i.id)}
                    />
                    <label className="form-check-label" htmlFor={i.id}>{i.label} ({i.price})</label>
                  </div>
                ))
              }

              { selectedItems.length === 3 && (<span className="text-success d-block">(20% Discounted)</span>)}
            </div>
              {/* <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>

              <span className="text-success d-block">(20% Discounted)</span>
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div> */}

            <div>Total Payment : {computeTotalPayment()} THB</div>
          </div>

          <div className="modal-footer">
            <div>
              <input
                className="m-2 form-check-input"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              /> I agree to the terms and conditions
            </div>
            <button 
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}
            >
              Register
            </button>

          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}
