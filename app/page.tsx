'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ExternalLink,
  Printer,
  Briefcase,
  Layers,
  CircleCheck,
  Zap,
  Target
} from 'lucide-react';
import { useForm } from 'react-hook-form';

// --- Data Structures ---

type CustomerStatus = 'New Customer' | 'Existing Customer';
type BrandStatus = 'New Brand' | 'Existing Brand';
type SKUStatus = 'New SKUs' | 'Existing SKUs';

interface ProjectInputs {
  clientName: string;
  brandName: string;
  customerStatus: CustomerStatus;
  brandStatus: BrandStatus;
  skuStatus: SKUStatus;
  skuCount: number;
  startDate: string;
}

interface RequiredFile {
  name: string;
  url?: string;
}

interface MilestoneTask {
  name: string;
  start: number;
  end: number;
  type: 'Operational' | 'Technical';
}

interface ScenarioData {
  duration: string;
  durationWeeks: number;
  files: RequiredFile[];
  milestones: MilestoneTask[];
}

const SCENARIOS: Record<string, ScenarioData> = {
  'New Customer-New Brand-New SKUs': {
    duration: '10 Weeks',
    durationWeeks: 10,
    files: [
      { name: 'Site build form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgC3GdqHtxQsTrh7FMTRXd2gAS9pV3gz1dRLDbnY2gbccwA?e=81jlL0' },
      { name: 'Catalog New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'Content New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'New Images upload', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgA5mu_5ICPGQKeNhZ42ARH3AXXr2D5Dkak7muNiRxYsg4E?e=bPRFbo' },
      { name: 'Customer creation form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgAcsm9iH4jvQ4Y73mgLlPqhAVrzA5sGdsSc9cR7v31M6kE?e=tvSByj' },
      { name: 'Supplier creation form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgAcsm9iH4jvQ4Y73mgLlPqhAVrzA5sGdsSc9cR7v31M6kE?e=tvSByj' },
      { name: 'Operations Brief', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDBVslqPLk9Q6L6OAUaA4riAZ8rlAgSYBP1sOwakx7AmOg?e=shBOxi' },
      { name: 'Letter of Authorization' },
      { name: 'Stock owner' },
      { name: 'Legal Entity' },
      { name: 'Project reporting', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDjlN-9UUkZTIH-Zsodjm98AVlGzGiP4YPE4oLitncA6cM?e=xTZQ4h' },
    ],
    milestones: [
      { name: 'Stock Owner Creation', start: 1, end: 1, type: 'Operational' },
      { name: 'TTS Registration', start: 1, end: 1, type: 'Operational' },
      { name: 'Supplier Set Up', start: 2, end: 4, type: 'Operational' },
      { name: 'TTS Build', start: 2, end: 6, type: 'Operational' },
      { name: 'Compliance Review', start: 2, end: 4, type: 'Operational' },
      { name: 'Catalogue Upload', start: 2, end: 2, type: 'Operational' },
      { name: 'Content Upload', start: 3, end: 3, type: 'Operational' },
      { name: 'Stock PO', start: 5, end: 5, type: 'Operational' },
      { name: 'Stock Delivery', start: 6, end: 6, type: 'Operational' },
      { name: 'Stock Process', start: 7, end: 7, type: 'Operational' },
      { name: 'Customer Service', start: 8, end: 8, type: 'Operational' },
      { name: 'Financial Reporting', start: 10, end: 10, type: 'Operational' },
      { name: 'Site Franking', start: 4, end: 4, type: 'Technical' },
      { name: 'Gateway Set Up', start: 5, end: 5, type: 'Technical' },
      { name: 'MMS Config', start: 5, end: 8, type: 'Technical' },
      { name: 'Product Listing', start: 8, end: 8, type: 'Technical' },
      { name: 'Live Order Testing', start: 9, end: 10, type: 'Technical' },
      { name: 'Go Live', start: 10, end: 10, type: 'Technical' },
    ],
  },
  'Existing Customer-New Brand-New SKUs': {
    duration: '8 Weeks',
    durationWeeks: 8,
    files: [
      { name: 'Site build form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgC3GdqHtxQsTrh7FMTRXd2gAS9pV3gz1dRLDbnY2gbccwA?e=81jlL0' },
      { name: 'Catalog New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'Content New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'New Images upload', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgA5mu_5ICPGQKeNhZ42ARH3AXXr2D5Dkak7muNiRxYsg4E?e=bPRFbo' },
      { name: 'Operations Brief', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDBVslqPLk9Q6L6OAUaA4riAZ8rlAgSYBP1sOwakx7AmOg?e=shBOxi' },
      { name: 'Letter of Authorization' },
      { name: 'Stock owner' },
      { name: 'Project reporting', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDjlN-9UUkZTIH-Zsodjm98AVlGzGiP4YPE4oLitncA6cM?e=xTZQ4h' },
    ],
    milestones: [
      { name: 'Brand Sync & Registration', start: 1, end: 1, type: 'Operational' },
      { name: 'Supplier Validation', start: 1, end: 2, type: 'Operational' },
      { name: 'Catalogue & Content Upload', start: 2, end: 3, type: 'Operational' },
      { name: 'TTS Build Phase', start: 3, end: 5, type: 'Operational' },
      { name: 'Stock Logistics (PO/Shipment)', start: 4, end: 6, type: 'Operational' },
      { name: 'MMS Configuration', start: 4, end: 7, type: 'Technical' },
      { name: 'Live Testing & QA', start: 7, end: 8, type: 'Technical' },
      { name: 'GO LIVE', start: 8, end: 8, type: 'Technical' },
    ],
  },
  'Existing Customer-Existing Brand-New SKUs': {
    duration: '6 Weeks',
    durationWeeks: 6,
    files: [
      { name: 'Catalog New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'Content New Line Form', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgASpsnLwzdeRJ0R28PyshYnARDuUO9suFZM2JKwNvXZ4wo?e=STKDvk' },
      { name: 'New Images upload', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgA5mu_5ICPGQKeNhZ42ARH3AXXr2D5Dkak7muNiRxYsg4E?e=bPRFbo' },
      { name: 'Letter of Authorization' },
      { name: 'Project reporting', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDjlN-9UUkZTIH-Zsodjm98AVlGzGiP4YPE4oLitncA6cM?e=xTZQ4h' },
    ],
    milestones: [
      { name: 'SKU Catalog Audit', start: 1, end: 1, type: 'Operational' },
      { name: 'Catalogue & Content Setup', start: 2, end: 3, type: 'Operational' },
      { name: 'Warehouse Integration Update', start: 3, end: 4, type: 'Operational' },
      { name: 'MMS SKU Mapping', start: 4, end: 5, type: 'Technical' },
      { name: 'Listing Verification', start: 5, end: 6, type: 'Technical' },
      { name: 'GO LIVE', start: 6, end: 6, type: 'Technical' },
    ],
  },
  'Existing Customer-Existing Brand-Existing SKUs': {
    duration: '6 Weeks',
    durationWeeks: 6,
    files: [
      { name: 'Letter of Authorization' },
      { name: 'Project reporting', url: 'https://hutgroupnorthwich.sharepoint.com/:f:/t/TechProjectManagementCentral/IgDjlN-9UUkZTIH-Zsodjm98AVlGzGiP4YPE4oLitncA6cM?e=xTZQ4h' },
    ],
    milestones: [
      { name: 'Shop Health Audit', start: 1, end: 1, type: 'Operational' },
      { name: 'Account Re-verification', start: 1, end: 2, type: 'Operational' },
      { name: 'API Bridge Connection', start: 3, end: 4, type: 'Technical' },
      { name: 'End-to-End Order Test', start: 5, end: 5, type: 'Technical' },
      { name: 'GO LIVE', start: 6, end: 6, type: 'Technical' },
    ],
  },
};

// --- Helper Functions ---

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Parse a YYYY-MM-DD string as a LOCAL date. `new Date('YYYY-MM-DD')` is parsed as UTC,
// which shifts the displayed date back a day for users west of UTC.
const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const toLocalISODate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const getTargetLiveDate = (startDate: string, weeks: number) => {
  const date = parseLocalDate(startDate);
  date.setDate(date.getDate() + (weeks * 7));
  return formatDate(date);
};

const calculateReadiness = (startDateStr: string, durationWeeks: number) => {
  const now = new Date();
  const start = parseLocalDate(startDateStr);
  const end = new Date(start);
  end.setDate(end.getDate() + (durationWeeks * 7));

  if (now < start) return 0;
  if (now > end) return 100;

  const totalTime = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  
  return Math.round((elapsed / totalTime) * 100);
};

const getWeekDateRange = (startDateStr: string, weekIndex: number) => {
  const start = parseLocalDate(startDateStr);
  start.setDate(start.getDate() + weekIndex * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${formatDate(start)} - ${formatDate(end)}`;
};

// --- Components ---

export default function TikTokShopPlanner() {
  const [result, setResult] = useState<{ inputs: ProjectInputs; scenario: ScenarioData } | null>(null);
  const [unsupported, setUnsupported] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInputs>({
    defaultValues: {
      customerStatus: 'New Customer',
      brandStatus: 'New Brand',
      skuStatus: 'New SKUs',
      skuCount: 1,
      startDate: toLocalISODate(new Date())
    }
  });

  const onSubmit = (data: ProjectInputs) => {
    const scenarioKey = `${data.customerStatus}-${data.brandStatus}-${data.skuStatus}`;
    const scenario = SCENARIOS[scenarioKey];

    if (scenario) {
      setUnsupported(null);
      setResult({ inputs: data, scenario });
    } else {
      setResult(null);
      setUnsupported(`${data.customerStatus} / ${data.brandStatus} / ${data.skuStatus}`);
    }
  };

  const notBlank = (v: string) => v.trim().length > 0 || 'Required';

  return (
    <div className="bg-zinc-50 font-sans text-zinc-900 w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded">
            <span className="text-white font-bold text-xs">THG</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight">TikTok Shop Project Planner</h1>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          <span>Internal Tool</span>
          <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
          <span className="text-zinc-900 leading-none">Business Development</span>
        </div>
      </nav>

      {/* Main Dashboard Layout */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section (Left Sidebar) */}
        <section className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> Project Configuration
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">Client Name</label>
                <input
                  {...register('clientName', { required: 'Required', validate: notBlank })}
                  placeholder="e.g. L'Oreal Group"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
                {errors.clientName && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.clientName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">Brand Name</label>
                <input
                  {...register('brandName', { required: 'Required', validate: notBlank })}
                  placeholder="e.g. Kiehl's"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                />
                {errors.brandName && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.brandName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">Customer Status</label>
                  <select
                    {...register('customerStatus')}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none appearance-none bg-white cursor-pointer"
                  >
                    <option value="New Customer">New</option>
                    <option value="Existing Customer">Existing</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">Brand Status</label>
                  <select
                    {...register('brandStatus')}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none appearance-none bg-white cursor-pointer"
                  >
                    <option value="New Brand">New</option>
                    <option value="Existing Brand">Existing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">SKU Status</label>
                  <select
                    {...register('skuStatus')}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none appearance-none bg-white cursor-pointer"
                  >
                    <option value="New SKUs">New SKUs</option>
                    <option value="Existing SKUs">Existing</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">SKU Count</label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    {...register('skuCount', {
                      valueAsNumber: true,
                      required: 'Required',
                      min: { value: 1, message: 'Min 1' },
                      validate: (v) => Number.isInteger(v) || 'Whole number',
                    })}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                  {errors.skuCount && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.skuCount.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">Tentative Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    {...register('startDate', { required: 'Required' })}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-zinc-200 active:scale-[0.98]"
              >
                <span>Generate Project Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </section>

        {/* Output Section (Bento Grid) */}
        <section className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!result && unsupported ? (
              <motion.div
                key="unsupported"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-amber-300 bg-amber-50 rounded-3xl"
              >
                <h3 className="text-xl font-bold text-zinc-800">No Plan Template Available</h3>
                <p className="text-zinc-600 max-w-sm mt-2">
                  There is no project plan defined for <span className="font-bold">{unsupported}</span> yet. Try a different combination.
                </p>
              </motion.div>
            ) : !result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-zinc-200 rounded-3xl"
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-800">No Plan Generated</h3>
                <p className="text-zinc-500 max-w-xs mt-2">Configure the project details on the left and click generate to view your strategic roadmap.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full print:block print:space-y-6"
              >
                {/* Summary Box */}
                <div className="col-span-1 md:col-span-1 bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group h-64 md:h-auto">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-32 h-32 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Strategic Summary</h3>
                    <div className="space-y-1">
                      <p className="text-3xl font-light tracking-tight truncate">
                        {result.inputs.clientName} <span className="text-zinc-600 font-normal">/</span> {result.inputs.brandName}
                      </p>
                      <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                        Scenario: {result.inputs.customerStatus} Onboarding
                      </p>
                      <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        {result.inputs.skuCount} {result.inputs.skuCount === 1 ? 'SKU' : 'SKUs'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 translate-y-2">
                    <span className="text-6xl font-bold tracking-tighter leading-none">{result.scenario.durationWeeks}</span>
                    <div className="mb-1 space-y-0.5">
                      <span className="block text-[10px] text-zinc-500 uppercase font-black leading-none">Weeks Total</span>
                      <span className="block text-[10px] text-zinc-400 font-bold leading-none italic uppercase">Estimated Lead Time</span>
                    </div>
                  </div>
                </div>

                {/* Documents Box */}
                <div className="col-span-1 md:row-span-2 bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Documentation Required</h3>
                    <div className="flex gap-1">
                      <CircleCheck className="w-3.5 h-3.5 text-zinc-300" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {result.scenario.files.map((file, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-3.5 rounded-2xl border border-zinc-100 hover:border-zinc-900/10 hover:bg-zinc-50 transition-all group flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-zinc-700">{file.name}</span>
                        {file.url ? (
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-zinc-100 text-zinc-500 px-3 py-1.5 rounded-full group-hover:bg-black group-hover:text-white transition-all font-black flex items-center gap-1 uppercase"
                          >
                            LINK <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[9px] text-zinc-400 font-bold bg-zinc-50 px-3 py-1.5 rounded-full uppercase italic">Pending Data</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="mt-6 w-full py-3 border border-zinc-200 text-zinc-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 print:hidden"
                  >
                    <Printer className="w-3 h-3" /> Export Checklist
                  </button>
                </div>

                {/* Launch Readiness Box */}
                <div className="col-span-1 bg-white border border-zinc-200 rounded-3xl p-8 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white via-white to-zinc-50 translate-z-0">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Launch Readiness
                  </h3>
                  <div className="flex items-center gap-6">
                    {(() => {
                      const readiness = calculateReadiness(result.inputs.startDate, result.scenario.durationWeeks);
                      return (
                        <>
                          <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center relative shadow-sm"
                            style={{ 
                              background: `conic-gradient(black ${readiness}%, #f4f4f5 0)` 
                            }}
                          >
                            <div className="absolute inset-1 bg-white rounded-full"></div>
                            <span className="text-lg font-black tracking-tighter relative z-10">{readiness}%</span>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-zinc-400 uppercase leading-none">Start Phase</p>
                              <p className="text-sm font-bold text-zinc-800">{formatDate(parseLocalDate(result.inputs.startDate))}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-zinc-900 bg-cyan-100 px-2 rounded w-fit uppercase leading-none">Live Target</p>
                              <p className="text-sm font-bold text-zinc-900">{getTargetLiveDate(result.inputs.startDate, result.scenario.durationWeeks)}</p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Roadmap Box */}
                <div className="col-span-1 md:col-span-2 bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col print:border-none">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Project Strategic Roadmap <span className="text-zinc-300 mx-2">/</span> Operational & Technical Setup
                    </h3>
                    <div className="hidden md:flex gap-2">
                       <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-zinc-400"><div className="w-2 h-2 bg-zinc-900 rounded-sm"></div> Operational</span>
                       <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-zinc-400"><div className="w-2 h-2 bg-cyan-400 rounded-sm"></div> Technical</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Array.from({ length: result.scenario.durationWeeks }).map((_, idx) => {
                      const weekIndex = idx + 1;
                      const operationalTasks = result.scenario.milestones.filter(m => m.type === 'Operational' && weekIndex >= m.start && weekIndex <= m.end);
                      const technicalTasks = result.scenario.milestones.filter(m => m.type === 'Technical' && weekIndex >= m.start && weekIndex <= m.end);

                      return (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex gap-6 group"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                              idx === 0 ? 'bg-black text-white' : 
                              idx === result.scenario.durationWeeks - 1 ? 'bg-cyan-400 text-white' : 
                              'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-black'
                            }`}>
                              W{weekIndex}
                            </div>
                            {idx !== result.scenario.durationWeeks - 1 && (
                              <div className="w-px h-full bg-zinc-100 my-2 group-hover:bg-zinc-200 transition-colors"></div>
                            )}
                          </div>

                          <div className="flex-1 pb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                              <h4 className="text-sm font-black text-zinc-800 uppercase tracking-tight flex items-center gap-2">
                                {getWeekDateRange(result.inputs.startDate, idx)}
                                {idx === 0 && <span className="bg-zinc-100 text-zinc-500 text-[8px] px-2 py-0.5 rounded-full">KICKOFF</span>}
                                {idx === result.scenario.durationWeeks - 1 && <span className="bg-cyan-50 text-cyan-600 text-[8px] px-2 py-0.5 rounded-full">GO LIVE</span>}
                              </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Operational Column */}
                              <div className="space-y-2">
                                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest pl-1">Operational Setup</p>
                                <div className="flex flex-wrap gap-2">
                                  {operationalTasks.length > 0 ? operationalTasks.map((task, tIdx) => (
                                    <span key={tIdx} className="bg-zinc-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                      {task.name}
                                    </span>
                                  )) : (
                                    <span className="text-[10px] text-zinc-300 italic pl-1">No active operational tasks</span>
                                  )}
                                </div>
                              </div>

                              {/* Technical Column */}
                              <div className="space-y-2">
                                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest pl-1">Technical Setup</p>
                                <div className="flex flex-wrap gap-2">
                                  {technicalTasks.length > 0 ? technicalTasks.map((task, tIdx) => (
                                    <span key={tIdx} className="bg-cyan-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                      {task.name}
                                    </span>
                                  )) : (
                                    <span className="text-[10px] text-zinc-300 italic pl-1">No active technical tasks</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      
      {/* Footer Info */}
      <footer className="h-16 px-8 flex items-center justify-between text-[10px] text-zinc-400 bg-white border-t border-zinc-100 shrink-0 mt-auto">
        <p className="font-medium uppercase tracking-tight">© {new Date().getFullYear()} THG Business Development. Enterprise Strategic Asset.</p>
        <div className="flex gap-6 uppercase font-black">
          <span className="text-zinc-300">v3.1.0-STABLE</span>
          <span className="text-emerald-500 flex items-center gap-1 leading-none h-fit">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            System Standby
          </span>
        </div>
      </footer>
    </div>
  );
}
