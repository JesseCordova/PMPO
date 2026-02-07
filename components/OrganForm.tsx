
import React, { useState, useEffect } from 'react';
import { Organ, Location, OrganLocation } from '../types';
import { CHURCH_LOCATIONS } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { Save, X } from 'lucide-react';

interface OrganFormProps {
  locationId: string;
  locations: Location[];
  initialData?: Organ;
  onSubmit: (organ: Organ) => void;
  onCancel: () => void;
}

export const OrganForm: React.FC<OrganFormProps> = ({ locationId, locations, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    churchLocation: 'Salão da igreja' as OrganLocation,
    model: '',
    serialNumber: '',
    patrimonyNumber: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        churchLocation: initialData.churchLocation,
        model: initialData.model,
        serialNumber: initialData.serialNumber,
        patrimonyNumber: initialData.patrimonyNumber,
      });
    }
  }, [initialData]);

  const currentLocation = locations.find(l => l.id === (initialData?.locationId || locationId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const organ: Organ = {
      id: initialData?.id || uuidv4(),
      locationId: initialData?.locationId || locationId,
      ...formData,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };
    onSubmit(organ);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-200 animate-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          {initialData ? 'Editar Instrumento' : 'Cadastro de Instrumento'}
        </h2>
        <p className="text-slate-500 font-medium">Localidade: <span className="text-blue-600 font-bold">{currentLocation?.name}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Posição no Local</label>
            <select 
              value={formData.churchLocation}
              onChange={(e) => setFormData({ ...formData, churchLocation: e.target.value as OrganLocation })}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 shadow-inner"
            >
              {CHURCH_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Modelo do Órgão</label>
            <input 
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="Ex: Tokai MD-10, Minuetto..."
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nº Série</label>
            <input 
              type="text"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              placeholder="Código do fabricante"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nº Patrimônio</label>
            <input 
              type="text"
              value={formData.patrimonyNumber}
              onChange={(e) => setFormData({ ...formData, patrimonyNumber: e.target.value })}
              placeholder="Código de controle"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700 shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-100">
          <button 
            type="submit"
            className="flex-1 bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100 border border-blue-500"
          >
            <Save size={20} className="text-blue-100" />
            {initialData ? 'Salvar Alterações' : 'Finalizar Cadastro'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-10 py-5 bg-slate-100 text-slate-500 rounded-[24px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 border border-slate-200"
          >
            <X size={20} className="text-sky-300" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
