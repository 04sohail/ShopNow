import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        images: [''],
        thumbnail: '',
        discountpercentage: '',
        rating: '',
        stock: '',
        brand: '',
        warrantyinformation: '',
        shippinginformation: '',
        availabilitystatus: '',
        returnpolicy: '',
        status: '1'
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/products', {
                ...formData,
                price: parseFloat(formData.price) || undefined,
                discountpercentage: formData.discountpercentage ? parseFloat(formData.discountpercentage) : null,
                rating: formData.rating ? parseFloat(formData.rating) : null,
                stock: parseInt(formData.stock) || 0,
                images: formData.images.filter(img => img.trim() !== '')
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.detail?.map(e => e.msg).join(', ') || 'Failed to create product');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800">Create Product</h2>
            {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="fitness">Fitness</option>
                    <option value="home">Home</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Images</label>
                {formData.images.map((img, index) => (
                    <input
                        key={index}
                        type="url"
                        value={img}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    />
                ))}
                <button
                    type="button"
                    onClick={addImageField}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                >
                    Add Another Image
                </button>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thumbnail URL (e.g., https://example.com/thumbnail.jpg)"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                <input
                    inputMode="numeric"
                    type="tel"
                    maxLength={3}
                    pattern="[0-100]*"
                    name="discountpercentage"
                    value={formData.discountpercentage}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    placeholder="0-100"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                    type="tel"
                    maxLength={4}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    placeholder="0-5"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                    type="tel"
                    maxLength={5}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0 or more"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Warranty Information</label>
                <input
                    type="text"
                    name="warrantyinformation"
                    value={formData.warrantyinformation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1 year warranty"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Information</label>
                <input
                    type="text"
                    name="shippinginformation"
                    value={formData.shippinginformation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Ships in 1-2 days"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Availability Status</label>
                <input
                    type="text"
                    name="availabilitystatus"
                    value={formData.availabilitystatus}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., In Stock"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Return Policy</label>
                <input
                    type="text"
                    name="returnpolicy"
                    value={formData.returnpolicy}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 30 days return"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create
                </button>
                <Link to="/" className="text-blue-500 px-4 py-2 hover:text-blue-700">
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default ProductForm;