import React, { memo, useState } from "react";
import { CategoryType } from "../../../../types";

const RemoveCategory: React.FC<{ category: CategoryType }> = ({ category }) => {
    const [deletedCategory, setDeletedCategory] = useState<CategoryType | null>(
        null
    );

    const handleDeleteCategory = async () => {};

    return (
        <div>
            <p className="text-red-500">
                Deleting this category will also remove all associated services.
            </p>

            <button>Delete</button>
        </div>
    );
};

export default memo(RemoveCategory);
