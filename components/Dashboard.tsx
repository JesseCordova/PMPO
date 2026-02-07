
import React from 'react';
import { AppState, Organ } from '../types';
import { AlertTriangle, CheckCircle2, Search, Plus } from 'lucide-react';

interface DashboardProps {
  state: AppState;
  isMaintenancePending: (id: string) => boolean;
  isLocationPending: (id: string) => boolean;
  onSelectMaintenance: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ state, isMaintenancePending, isLocationPending, onSelectMaintenance }) => {
  const pendingCount = state.organs.filter(o => isMaintenancePending(o.id)).length;
  const okCount = state.organs.length - pendingCount;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Total de Órgãos</div>
          <div className="text-4xl font-bold text-slate-800">{state.organs.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Em Dia</div>
          <div className="text-4xl font-bold text-green-600">{okCount}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-red-500">
          <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider text-red-600">Manutenção Pendente</div>
          <div className="text-4xl font-bold text-red-600">{pendingCount}</div>
        </div>
      </div>

      {/* Organs Table/List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Instrumentos por Localidade</h3>
          <div className="flex gap-3">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                type="text" 
                placeholder="Buscar por modelo ou série..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Modelo</th>
                <th className="px-6 py-4">Localização</th>
                <th className="px-6 py-4">Nº Patrimônio</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {state.organs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    Nenhum órgão cadastrado no sistema.
                  </td>
                </tr>
              ) : (
                state.organs.map(organ => {
                  const isPending = isMaintenancePending(organ.id);
                  const location = state.locations.find(l => l.id === organ.locationId);
                  
                  return (
                    <tr key={organ.id} className={`transition-colors hover:bg-slate-50 ${isPending ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4">
                        {isPending ? (
                          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                            <AlertTriangle size={18} />
                            Manutenção pendente
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                            <CheckCircle2 size={18} />
                            Em dia
                          </div>
                        )}
                      </td>
                      <td className={`px-6 py-4 font-medium ${isPending ? 'text-red-700' : 'text-slate-800'}`}>
                        {organ.model}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isPending ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
                        {location?.adm} {location?.name} ({organ.churchLocation})
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono text-sm uppercase">
                        {organ.patrimonyNumber}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => onSelectMaintenance(organ.id)}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1"
                        >
                          <Plus size={14} />
                          Registrar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
