import _ from "lodash";
import {hash} from "../../lib/functions/hash";
import roundToTwo from "../../lib/functions/roundToTwo";
import {ProductList, ProductsByCategory} from "./types";

const colors = [
	"Primary",
	"Secondary",
	"Tertiary",
	"Quaternary",
	"Quinary",
	"Info",
	"Success",
	"Warning",
	"Danger",
	"Light",
	"Dark"
];

const productTypes = [
	{
		type: "hats",
		subCategories: ["Hat", "Brim", "Beanie", "Cap", "Fedora", "Top Hat"]
	},
	{
		type: "jackets",
		subCategories: ["Jacket", "Coat", "Trench-coat", "Sterling", "Sweater Vest"]
	},
	{
		type: "sneakers",
		subCategories: [
			"Authentic Sneakers",
			"Canvas",
			"Designer Sneakers",
			"Basketball Sneakers",
			"Leather Sneakers",
			"Plimsoll Sneakers",
			"Slip-ons",
			"Synthetic Sneakers"
		]
	},
	{
		type: "mens",
		subCategories: ["Shirt", "T-Shirt", "Vest", "Long-sleeve", "Sweater", "Suit"]
	},
	{
		type: "womens",
		subCategories: ["Tank-top", "Blouse", "Dress", "Sweater", "Suit"]
	},
]

const minItems = 5;
const maxItems = 14;

const minPrice = 1;
const maxPrice = 1200;

const minWidth  = 300;
const maxWidth  = 600;
const minHeight = 200;
const maxHeight = 400;

export function generateProducts (): ProductsByCategory {
	const res: ProductsByCategory = {};
	for (const {type, subCategories} of productTypes) {
		const products: ProductList = {};
		const n                     = _.random(minItems, maxItems);
		for (let i = 0; i < n; i++) {
			let id       = hash(type + i + new Date().toString() + _.uniqueId());
			let width    = _.random(minWidth, maxWidth);
			let height   = _.random(minHeight, maxHeight);
			products[id] = {
				id,
				name: colors[_.random(colors.length - 1)] + " " + subCategories[_.random(subCategories.length - 1)],
				price: roundToTwo(_.random(minPrice, maxPrice, true)),
				imageUrl: `https://picsum.photos/seed/${id}/${width}/${height}.jpg`
			};
		}
		res[type] = products;
	}
	return res;
}
