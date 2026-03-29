import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useRepairs } from '../hooks/useRepairs';

const CreateRepair = () => {
  const navigate = useNavigate();
  const { createRepair } = useRepairs();
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // ✅ FIX: Accumulate files so selecting more doesn't delete previous ones
    setImages((prev) => [...prev, ...files]);

    // Create local preview URLs and add to previous ones
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...filePreviews]);
  };

  const removeImage = (index) => {
    // Revoke the URL to save memory
    URL.revokeObjectURL(preview[index]);
    
    setImages(images.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // ✅ FIX: Clear any auto-appended 'images' and manually add from state
    formData.delete('images'); 
    
    if (images.length === 0) {
      return alert("Please upload at least one image of the device.");
    }

    images.forEach((image) => {
      formData.append('images', image);
    });

    createRepair.mutate(formData, {
      onSuccess: () => {
        alert("Repair Request Sent Successfully! ✅");
        navigate('/dashboard');
      },
      onError: (err) => alert("Submission failed: " + err.message)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pt-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50"
      >
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">New Request</h1>
          <p className="text-slate-400 font-medium uppercase text-[10px] tracking-[2px]">Step 1: Device Information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Device Type</label>
              <select 
                name="device" 
                required 
                className="bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Parts">Parts</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Brand</label>
              <input 
                name="deviceBrand" 
                type="text" 
                placeholder="Apple, HP, Dell..." 
                required 
                className="bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 font-bold outline-none transition-all" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Model Name</label>
            <input 
              name="deviceModel" 
              type="text" 
              placeholder="e.g. MacBook Pro M4 or Custom Desktop" 
              required 
              className="bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl p-4 font-bold outline-none transition-all" 
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Issue Description</label>
            <textarea 
              name="issue" 
              rows="4" 
              placeholder="Describe the problem in detail..." 
              required 
              className="bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl p-4 font-medium outline-none resize-none transition-all"
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-[2px]">Upload Photos</label>
            <div className="relative group">
               <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-blue-400 rounded-3xl p-8 text-center transition-all">
                <span className="text-2xl mb-2 block">📸</span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select device photos</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <AnimatePresence>
                {preview.map((url, i) => (
                  <motion.div 
                    key={url}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="relative group"
                  >
                    <img src={url} alt="preview" className="h-20 w-20 object-cover rounded-2xl border-2 border-white shadow-md" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={createRepair.isPending}
            className="w-full py-5 rounded-2xl font-black text-white shadow-xl bg-blue-600 hover:bg-blue-700 transition-all uppercase tracking-[2px] text-sm disabled:bg-slate-300 active:scale-[0.98]"
          >
            {createRepair.isPending ? "Sending to Lab..." : "Submit Request →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateRepair;