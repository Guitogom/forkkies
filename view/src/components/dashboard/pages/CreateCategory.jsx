import '../../../styles/Categories.css'

export function CreateCategory() {
    return (
        <section className='new-category'>
            <div className='image-input'>
                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage" id="categoryImage" />
            </div>
            <input type="text" placeholder='Category Name' value={"New Category"} />
            <button>Save</button>
        </section>
    )
}