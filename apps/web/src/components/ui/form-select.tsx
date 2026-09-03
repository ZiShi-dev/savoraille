'use client';

import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

type SelectOption = {
  value: string;
  label: string;
};

export function FormSelect({ value, onChange, options, label, rtl = false }: { value: string; onChange: (value: string) => void; options: SelectOption[]; label: string; rtl?: boolean }) {
  return (
    <Select.Root value={value} onValueChange={onChange} dir={rtl ? 'rtl' : 'ltr'}>
      <Select.Trigger aria-label={label} className="mt-2 flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-[#1E3A5F]/14 bg-white px-4 text-sm text-[#241F19] outline-none transition-all hover:border-[#C6A15B]/65 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/35 data-[placeholder]:text-[#241F19]/38">
        <Select.Value />
        <Select.Icon><ChevronDown className="size-4 text-[#C6A15B]" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={6} collisionPadding={12} className="z-[160] max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#C6A15B]/35 bg-[#FFFDFC] p-1.5 text-[#241F19] shadow-[0_18px_45px_rgba(30,58,95,0.22)]">
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value} className="relative flex cursor-default select-none items-center rounded-lg py-2.5 pe-9 ps-3 text-sm outline-none data-[highlighted]:bg-[#1E3A5F] data-[highlighted]:text-[#FAF6EC] data-[state=checked]:font-bold">
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute end-2.5"><Check className="size-4 text-[#C6A15B]" /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
