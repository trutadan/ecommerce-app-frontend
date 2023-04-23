import { BACKEND_API_URL } from "../../../constants";
import { DetailedItem } from "../../../models/Item";

export const handleAddItemToCart = async (item: DetailedItem) => {
  try {
    let response = await fetch(`${BACKEND_API_URL}/api/user/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const user = await response.json();

    response = await fetch(`${BACKEND_API_URL}/cart/from-user/${user.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const cart = await response.json();

    await fetch(`/api/cart/${cart.id}/item/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item.id, quantity: 1 }),
    });

    console.log("Item added to cart:", item);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
  }
};
