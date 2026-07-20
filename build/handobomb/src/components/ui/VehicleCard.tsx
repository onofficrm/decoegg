import React from 'react';
import { Fuel, Info, Phone } from 'lucide-react';
import { Button } from './Button';
import { goConsult } from '../../lib/sitePages';

interface VehicleCardProps {
  key?: React.Key;
  image: string;
  manufacturer: string;
  name: string;
  purpose: string;
  fuel: string;
  type: string;
  status: string;
  href?: string;
}

export function VehicleCard({
  image,
  manufacturer,
  name,
  purpose,
  fuel,
  type,
  status,
  href,
}: VehicleCardProps) {
  return (
    <div className="bg-brand-card border border-white/5 clip-chamfer overflow-hidden group hover:border-brand-yellow/30 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-black">
        <img 
          src={image} 
          alt={`${manufacturer} ${name}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-brand-green text-brand-bg text-xs font-bold px-2 py-1 rounded-sm shadow-lg flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-bg animate-pulse"></div>
          {status}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-brand-body/70 font-mono mb-1">{manufacturer}</div>
        <h4 className="text-xl font-bold text-white mb-3">{name}</h4>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-brand-body">{purpose}</span>
          <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-brand-body">{type}</span>
          <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-brand-body flex items-center gap-1"><Fuel className="w-3 h-3" />{fuel}</span>
        </div>
        
        {/* Data Rows */}
        <div className="space-y-2 mt-auto mb-5 border-t border-white/5 pt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-brand-body">차량 가격</span>
            <span className="font-bold text-white">상담 후 확인</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-brand-body shrink-0">예상 납입금</span>
            <span className="font-bold text-brand-yellow text-xs sm:text-[13px] text-right ml-2">고객 조건에 따라 확인</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-brand-body">재고</span>
            <span className="font-bold text-white">실시간 상담 필요</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            variant="ghost"
            className="flex-1 !px-2 border !border-white/10 hover:!border-white/30 text-sm py-2"
            onClick={() => {
              if (href) window.location.href = href;
            }}
          >
            <Info className="w-4 h-4 mr-1" /> 자세히
          </Button>
          <Button variant="primary" className="flex-1 text-sm !px-2 py-2" onClick={() => goConsult()}>
            할부 상담 <Phone className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
