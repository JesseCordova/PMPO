
import React, { useState } from 'react';
import { Administration, AppState } from '../types';
import { AlertCircle, Music4, Search, X } from 'lucide-react';

interface AdmDashboardViewProps {
  adm: Administration;
  state: AppState;
  isLocationPending: (id: string) => boolean;
  onSelectLocation: (locId: string) => void;
}

export const AdmDashboardView: React.FC<AdmDashboardViewProps> = ({ adm, state, isLocationPending, onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const admLocations = state.locations.filter(l => l.adm === adm);
  
  const filteredLocations = admLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{adm}</h1>
        
        <div className="max-w-md mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Buscar localidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {filteredLocations.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-[32px] border border-dashed border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Nenhuma localidade encontrada</h3>
          <p className="text-slate-500">Tente ajustar sua pesquisa ou verifique se o nome está correto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => {
            const pending = isLocationPending(loc.id);
            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc.id)}
                className={`relative group bg-white p-8 rounded-3xl shadow-sm border transition-all hover:shadow-xl hover:-translate-y-1 text-left flex flex-col justify-between h-56 overflow-hidden ${
                  pending 
                  ? 'border-red-200 bg-red-50/30' 
                  : 'border-slate-100 hover:border-blue-500'
                }`}
              >
                {pending && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                    <AlertCircle size={12} />
                    Pendências
                  </div>
                )}
                
                <div className="p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-blue-50 transition-colors border border-slate-100">
                  <Music4 size={32} className={pending ? 'text-red-500' : 'text-sky-300 group-hover:text-sky-400'} />
                </div>

                <div>
                  <h3 className={`text-xl font-bold ${pending ? 'text-red-600' : 'text-slate-800'}`}>
                    {loc.name}
                  </h3>
                </div>
                
                <div className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
                  <Music4 size={120} className="text-sky-200" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
