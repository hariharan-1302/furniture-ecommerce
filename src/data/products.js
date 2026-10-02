export const API_URL = "https://dummyjson.com/products/category/furniture";
export const API_ONE = "https://dummyjson.com/products";

export const fetchFurniture = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

export const categories = [
  { id: 1, name: "Dining", img: "https://picsum.photos/id/1060/400/480" },
  { id: 2, name: "Living", img: "https://picsum.photos/id/1070/400/480" },
  { id: 3, name: "Bedroom", img: "https://picsum.photos/id/1062/400/480" },
];

export const galleryImages = [
  "https://picsum.photos/id/1011/400/400",
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1016/400/400",
  "https://picsum.photos/id/1018/400/300",
  "https://picsum.photos/id/1019/400/400",
  "https://picsum.photos/id/1020/400/300",
  "https://picsum.photos/id/1021/400/400",
  "https://picsum.photos/id/1022/400/300",
];

export const inspirationSlides = [
  { id: 1, room: "01 — Bed Room", title: "Inner Peace", img: "https://picsum.photos/id/1067/600/500" },
  { id: 2, room: "02 — Living Room", title: "Cozy Corner", img: "https://picsum.photos/id/1069/600/500" },
  { id: 3, room: "03 — Dining Room", title: "Family Table", img: "https://picsum.photos/id/1074/600/500" },
];

export const blogPosts = [
  { id: 1, title: "Going all-in with millennial design", cat: "Wood", author: "Admin", date: "14 Oct 2022", img: "https://picsum.photos/id/1031/800/500", text: "Mus eleifend velit vitae amet vestibulum, ultricies pharetra sit. Sodales dictum etiam blandit neque aliquet nulla diam, aenean." },
  { id: 2, title: "Exploring new ways of decorating", cat: "Handmade", author: "Admin", date: "20 Oct 2022", img: "https://picsum.photos/id/1032/800/500", text: "Pharetra amet sed ornare, lacus tincidunt mi dignissim enim. Vitae sodales amet lacus et sagittis tortor volutpat sit." },
  { id: 3, title: "Handmade pieces that took time to make", cat: "Crafts", author: "Admin", date: "25 Oct 2022", img: "https://picsum.photos/id/1033/800/500", text: "Id arcu adipiscing pharetra duis pharetra lorem dui suspendisse. Orci elit velit tellus orci leo ullamcorper." },
  { id: 4, title: "Modern home in Milan", cat: "Design", author: "Admin", date: "28 Oct 2022", img: "https://picsum.photos/id/1035/800/500", text: "Tortor, ac enim nunc volutpat amet, risus mauris. Porta elit et mattis rutrum suspendisse mauris maecenas." },
  { id: 5, title: "Colors that made the 2022 look", cat: "Interior", author: "Admin", date: "02 Nov 2022", img: "https://picsum.photos/id/1036/800/500", text: "Urna in tristique lectus aliquam nibh amet cras. Posuere tempor eu quam duis tortor. Elementum arcu massa." },
  { id: 6, title: "Making a minimal workspace", cat: "Wood", author: "Admin", date: "06 Nov 2022", img: "https://picsum.photos/id/1037/800/500", text: "Sed commodo, ex quis ornare tellus, orci quam. Nibh pretium sit arcu risus vivamus quisque pulvinar." },
];