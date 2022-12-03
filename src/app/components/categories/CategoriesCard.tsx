import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {spacing} from "../../utils/spacing";
import {Category} from "../../utils/types";

export type CategoriesCardProps_T = {
	cat: Category
};

export default function CategoriesCard ({cat}: CategoriesCardProps_T) {
	return (
		<div
			className="card el-in-1 rounded-4 bg-gradient--perfect-white" style={{
			marginTop: spacing(18)
		}}>
			<div
				className="card-img-top w-auto" style={{
				maxWidth: "100%",
				marginTop: spacing(-15),
				marginBottom: spacing(3),
				marginLeft: "auto",
				marginRight: "auto",
			}}>
				<div
					className="btn btn-el-2 btn-bordered-primary bg-light default-shadows rounded-5" style={{
					marginLeft: spacing(3),
					marginRight: spacing(3),
					padding: spacing(3),
				}}>
					<FontAwesomeIcon className="display-3" icon={cat.icon} /><br />
					<h4 className="text-uppercase fw-light my-2">Shop Now</h4>
				</div>
			</div>
			<div className="card-footer rounded-4 rounded-top-0 add-bg-noise h2 text-center mb-0">
				{cat.title}
			</div>
		</div>
	);
}
