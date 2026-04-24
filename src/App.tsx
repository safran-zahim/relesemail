import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Mail, Copy, Check, Download, Zap, Plus, Trash2, Send } from 'lucide-react';
import { Section, Field, Input, ListEditor, ImageField } from './components';
import { generateEmailHTML } from './emailGenerator';
import { generateWelcomeEmailHTML } from './welcomeGenerator';
import type { FormData, FeatureCategory, CTAButton, WelcomeFormData } from './types';
import { generateId } from './types';
import WelcomeForm, { WELCOME_INITIAL } from './WelcomeForm';
import { featureIcons } from './icons';

type TemplateType = 'release' | 'welcome';

const g = generateId;

const DEFAULT_CATEGORIES: FeatureCategory[] = [
  {
    id: g(), icon: '⭐', name: 'Performance Core',
    items: [
      { id: g(), text: 'Intelligent Default Selection And Ordering Of Employee & Self Reviews' },
      { id: g(), text: 'Display Review Status Indicators In Review Drop-Down' },
      { id: g(), text: 'Employee-Level Review Urgency Indicators In Performance Reviews List' },
      { id: g(), text: 'Dynamic Layout Switch For Manager Review' },
    ],
  },
  {
    id: g(), icon: '📊', name: 'Reports & Analytics',
    items: [
      { id: g(), text: 'Additional Export Option: XLSX - Phase 1' },
    ],
  },
  {
    id: g(), icon: '🗓️', name: 'Attendance',
    items: [
      { id: g(), text: 'Exception Rule: Roster Based Round Off Variance' },
      { id: g(), text: 'Roster Based Round Off Recalculation' },
      { id: g(), text: 'Punch In And Out Edit Restriction Based On Shifts' },
      { id: g(), text: 'Auto Populate Missing Attendance Records' },
    ],
  },
  {
    id: g(), icon: '👥', name: 'Roster',
    items: [
      { id: g(), text: 'Compact Shift Display In Monthly View' },
      { id: g(), text: 'Control Shift Creation/ Modification Using Shift Types' },
      { id: g(), text: 'Copy Weekly Schedule – Enforce Shift Creation Rules And Role-Based Behavior' },
      { id: g(), text: 'When Copying Shifts If There Are Conflicts - Create Empty Shifts' },
      { id: g(), text: 'Copy Weekly Schedule As Unassigned Shifts' },
      { id: g(), text: 'Group Shifts By Type Within Shift Groups On The Monthly Roster' },
      { id: g(), text: 'Move A Shift To Another Day Via Drag & Drop (Shift Group - Month View)' },
      { id: g(), text: 'Move Shift To A Different Shift Type Within The Same Shift Group' },
      { id: g(), text: 'Audit Trail For Shift Type Management' },
    ],
  },
  {
    id: g(), icon: '🤖', name: 'Citra',
    items: [
      { id: g(), text: 'Citra AI MS Teams Compatibility Fixes' },
      { id: g(), text: 'Citra AI UI Revamping' },
    ],
  },
  {
    id: g(), icon: '📈', name: 'Power BI',
    items: [
      { id: g(), text: 'Introduction of the Organizational Hierarchy View' },
      { id: g(), text: 'Improvements to the Job State Change View' },
    ],
  },
].map((cat, i) => {
  const DEFAULT_ICON_NAMES = ['icon_05', 'icon_04', 'icon_01', 'icon_02', 'icon_03', 'icon_06'];
  return {
    ...cat,
    iconName: DEFAULT_ICON_NAMES[i % DEFAULT_ICON_NAMES.length]
  };
});

const DEFAULT_BUTTONS: CTAButton[] = [
  { id: g(), label: 'Demo Video', url: '' },
  { id: g(), label: 'Presentation Slide Deck', url: '' },
  { id: g(), label: 'Release Notes & Build Information', url: '' },
  { id: g(), label: 'Schema Changes in 8.1', url: '' },
];

const INITIAL: FormData = {
  companyName: 'OrangeHRM',
  productName: 'ORANGEHRM',
  version: '8.1',
  tagline: 'Is Out As a Stable Version',
  brandColor: '#f97316',
  logoUrl: '',
  heroImageUrl: '',
  heroTitle: 'NEW FEATURE HIGHLIGHTS',
  heroSubtitle: 'Experience the new features in action. Click the button below to watch quick walkthrough videos.',
  featureCategories: DEFAULT_CATEGORIES,
  featuresImageUrl: '',
  highlightTitle: 'NEW FEATURE HIGHLIGHTS',
  highlightDesc: 'Experience the new features in action. Click the button below to watch quick walkthrough videos.\nOrangeHRM Citra: A Smarter Look. A Smoother Experience.',
  highlightImageUrl: '',
  highlightVideoUrl: '',
  enhancements: [
    { id: g(), text: 'Customer Reported Bug Fixes' },
  ],
  hostedEnvEnabled: true,
  hostedEnvDesc: "If you would like to play around with the new features, please feel free to use the below system. However, please ensure you don't change the default passwords of admin accounts.",
  hostedEnvImageUrl: '',
  hostedUrl: 'https://81-tag-kord.orangehrm.com/',
  adminUser: 'admin',
  adminPass: 'BestSystemEver100%',
  sysadminUser: '_ohrmSysAdmin_',
  sysadminPass: '>+$8YuqH3;W~&Nmw',
  generalPass: 'user@OHRM123',
  demoTitle: 'Stakeholder Demo (Feature Demo)\nVideo & Slide',
  demoImageUrl: '',
  demoButtons: DEFAULT_BUTTONS,
  footerText: 'Bring Innovation to Human Resource Management !!!',
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function App() {
  const [template, setTemplate] = useState<TemplateType>('release');
  const [form, setForm] = useState<FormData>(INITIAL);
  const [welcome, setWelcome] = useState<WelcomeFormData>(WELCOME_INITIAL);
  const [testRecipient, setTestRecipient] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(f => ({ ...f, [key]: value }));
  }, []);

  const emailHTML = template === 'release'
    ? generateEmailHTML(form)
    : generateWelcomeEmailHTML(welcome);

  const previewFilename = template === 'release'
    ? `${form.productName || 'release'}-${form.version || 'email'}.html`
    : `welcome-${(welcome.employeeName || 'new-member').replace(/\s+/g, '-').toLowerCase()}.html`;

  const emailSubject = template === 'release'
    ? 'Local Test: OrangeHRM 8.1'
    : `Local Test: Welcome ${welcome.employeeName || 'New Member'}`;

  const sendPayload = useMemo(() => {
    const payload = JSON.stringify({
      subject: emailSubject,
      htmlBody: emailHTML,
      to: testRecipient.trim() || undefined,
    });
    const bytes = new TextEncoder().encode(payload).length;
    return { payload, bytes };
  }, [emailSubject, emailHTML, testRecipient]);

  const handleCopy = async () => {
    try {
      const blob = new Blob([emailHTML], { type: 'text/html' });
      const item = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(emailHTML);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const el = document.createElement('textarea');
        el.value = emailHTML;
        el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([emailHTML], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = previewFilename;
    a.click();
  };

  const lastScrollSource = useRef<'form' | 'preview' | null>(null);
  const scrollTimeout = useRef<any>(null);

  const scrollToPreview = (sectionId: string) => {
    if (lastScrollSource.current === 'preview') return;
    lastScrollSource.current = 'form';
    
    if (!iframeRef.current?.contentWindow) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    const element = doc.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { lastScrollSource.current = null; }, 1000);
  };

  useEffect(() => {
    // Sync Preview -> Form
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_SCROLL' && lastScrollSource.current !== 'form') {
        lastScrollSource.current = 'preview';
        const sectionId = event.data.sectionId;
        const formElement = document.getElementById(`form-${sectionId}`);
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => { lastScrollSource.current = null; }, 1000);
      }
    };

    // Sync Form -> Preview (on Scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        if (lastScrollSource.current === 'preview') return;
        
        const visibleEntry = entries.find(e => e.isIntersecting);
        if (visibleEntry) {
          const formId = visibleEntry.target.id;
          const sectionId = formId.replace('form-', '');
          scrollToPreview(sectionId);
        }
      },
      { threshold: 0.5, rootMargin: '-10% 0px -70% 0px' }
    );

    const formSections = document.querySelectorAll('[id^="form-section-"]');
    formSections.forEach(s => observer.observe(s));

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      observer.disconnect();
    };
  }, []);

  const handleSendTestMail = async () => {
    setSending(true);
    setSendStatus(null);
    try {
      if (sendPayload.bytes > 4_000_000) throw new Error('Email content is too large.');
      const response = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: sendPayload.payload,
      });
      if (!response.ok) throw new Error('Failed to send mail');
      setSendStatus(`Test mail sent.`);
    } catch (error) {
      setSendStatus(error instanceof Error ? error.message : 'Error');
    } finally {
      setSending(false);
    }
  };

  const addCategory = () => {
    const keys = Object.keys(featureIcons);
    set('featureCategories', [
      ...form.featureCategories,
      { id: g(), icon: '⭐', name: '', iconName: keys[form.featureCategories.length % keys.length], items: [{ id: g(), text: '' }] }
    ]);
  };
  const removeCategory = (id: string) => set('featureCategories', form.featureCategories.filter(c => c.id !== id));
  const updateCategory = (id: string, patch: Partial<FeatureCategory>) =>
    set('featureCategories', form.featureCategories.map(c => c.id === id ? { ...c, ...patch } : c));

  const addDemoBtn = () => set('demoButtons', [...form.demoButtons, { id: g(), label: '', url: '' }]);
  const removeDemoBtn = (id: string) => set('demoButtons', form.demoButtons.filter(b => b.id !== id));
  const updateDemoBtn = (id: string, patch: Partial<CTAButton>) =>
    set('demoButtons', form.demoButtons.map(b => b.id === id ? { ...b, ...patch } : b));

  return (
    <div className="min-h-screen bg-[#F0F1F5]">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <Zap size={18} />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-base">Email Generator</span>
          </div>
          <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-100 rounded-xl p-1 ml-2">
            {([['release', '📢 Release'], ['welcome', '🎉 Welcome']] as const).map(([t, label]) => (
              <button key={t} onClick={() => setTemplate(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${template === t ? 'bg-white shadow text-indigo-700 border border-indigo-200' : 'text-gray-500 hover:text-gray-700'}`}>{label}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <input type="email" value={testRecipient} onChange={e => setTestRecipient(e.target.value)} placeholder="Send to email" className="w-64 max-w-[38vw] px-3 py-1.5 rounded-lg border border-indigo-200 text-xs bg-white focus:outline-none" />
            <div className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border ${sendPayload.bytes > 4000000 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {formatBytes(sendPayload.bytes)}
            </div>
            <button onClick={handleSendTestMail} disabled={sending} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white shadow-md hover:bg-emerald-700 disabled:opacity-60 transition-all">
              <Send size={14} /> {sending ? 'Sending...' : 'Send Test'}
            </button>
            <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${copied ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:from-indigo-600 transition-all">
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      </header>

      <div className="lg:hidden flex border-b border-indigo-100 bg-white sticky top-16 z-10">
        {(['form', 'preview'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 text-xs font-semibold ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50' : 'text-gray-500'}`}>{tab === 'form' ? '✏️ Editor' : '👁️ Preview'}</button>
        ))}
      </div>

      <main className="max-w-[1800px] mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
          <div className={`space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            {template === 'welcome' && <WelcomeForm form={welcome} setForm={setWelcome} />}
            {template === 'release' && (
              <div className="space-y-6 pb-20">
                <div id="form-section-branding">
                  <Section title="Branding & Identity" icon="🎨" color="violet" onActive={() => scrollToPreview('section-branding')}>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Field label="Company Name"><Input value={form.companyName} onChange={v => set('companyName', v)} placeholder="OrangeHRM" /></Field>
                      <Field label="Product Name"><Input value={form.productName} onChange={v => set('productName', v)} placeholder="ORANGEHRM" /></Field>
                      <Field label="Version"><Input value={form.version} onChange={v => set('version', v)} placeholder="8.1" /></Field>
                      <Field label="Brand Color">
                        <div className="flex gap-2 items-center">
                          <input type="color" value={form.brandColor} onChange={e => set('brandColor', e.target.value)} className="h-10 w-14 rounded-xl border border-indigo-100 cursor-pointer p-0.5" />
                          <Input value={form.brandColor} onChange={v => set('brandColor', v)} placeholder="#f97316" />
                        </div>
                      </Field>
                    </div>
                    <div className="mb-3"><ImageField label="Company Logo" value={form.logoUrl} onChange={v => set('logoUrl', v)} hint="optional" /></div>
                    <Field label="Tagline"><Input value={form.tagline} onChange={v => set('tagline', v)} placeholder="Is Out As a Stable Version" /></Field>
                  </Section>
                </div>

                <div id="form-section-hero">
                  <Section title="Hero Section" icon="🖼️" color="indigo" onActive={() => scrollToPreview('section-hero')}>
                    <ImageField label="Hero Banner Image" value={form.heroImageUrl} onChange={v => set('heroImageUrl', v)} hint="top banner" />
                  </Section>
                </div>

                <div id="form-section-features">
                  <Section title="Feature Categories" icon="⚡" color="amber" onActive={() => scrollToPreview('section-features')}>
                    <div className="space-y-4">
                      {form.featureCategories.map((cat, ci) => (
                        <div key={cat.id} className="border border-amber-100 rounded-2xl bg-amber-50/40 p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <select value={cat.iconName || ''} onChange={e => updateCategory(cat.id, { iconName: e.target.value })} className="w-24 px-1 py-2 bg-white border border-amber-200 rounded-xl text-center text-xs focus:outline-none focus:border-amber-400">
                              <option value="">Default</option>
                              {Object.keys(featureIcons).map(ic => <option key={ic} value={ic}>{ic}</option>)}
                            </select>
                            <input value={cat.name} onChange={e => updateCategory(cat.id, { name: e.target.value })} placeholder={`Category ${ci + 1} name`} className="flex-1 px-3 py-2 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none" />
                            <button onClick={() => removeCategory(cat.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 size={14} /></button>
                          </div>
                          <ListEditor items={cat.items} onChange={items => updateCategory(cat.id, { items })} placeholder="Feature description..." />
                        </div>
                      ))}
                    </div>
                    <button onClick={addCategory} className="mt-4 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-xl transition w-full justify-center">
                      <Plus size={14} /> Add Category
                    </button>
                    <div className="pt-4 mt-4 border-t border-amber-100">
                      <ImageField label="Section Image (After Categories)" value={form.featuresImageUrl} onChange={v => set('featuresImageUrl', v)} hint="optional" />
                    </div>
                  </Section>
                </div>

                <div id="form-section-highlights">
                  <Section title="New Feature Highlights" icon="🌟" color="pink" onActive={() => scrollToPreview('section-highlights')}>
                    <Field label="Section Title"><Input value={form.highlightTitle} onChange={v => set('highlightTitle', v)} placeholder="NEW FEATURE HIGHLIGHTS" /></Field>
                    <Field label="Description"><textarea value={form.highlightDesc} onChange={e => set('highlightDesc', e.target.value)} rows={3} placeholder="Experience the new features in action..." className="w-full px-3 py-2.5 bg-white border border-pink-100 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition resize-none" /></Field>
                    <ImageField label="Highlight Image" value={form.highlightImageUrl} onChange={v => set('highlightImageUrl', v)} />
                    <Field label="Video / CTA Button URL"><Input value={form.highlightVideoUrl} onChange={v => set('highlightVideoUrl', v)} placeholder="https://youtube.com/..." /></Field>
                  </Section>
                </div>

                <div id="form-section-enhancements">
                  <Section title="Enhancements / Bug Fixes" icon="🔧" color="emerald" onActive={() => scrollToPreview('section-enhancements')}>
                    <ListEditor items={form.enhancements} onChange={items => set('enhancements', items)} placeholder="Customer reported bug fix..." withIcons={true} iconOptions={Object.keys(featureIcons)} />
                  </Section>
                </div>

                <div id="form-section-hosted">
                  <Section title="Hosted Environment" icon="🌐" color="sky" onActive={() => scrollToPreview('section-hosted')}>
                    <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-xl border border-sky-100 mb-3">
                      <input type="checkbox" id="hostedEnvEnabled" checked={form.hostedEnvEnabled} onChange={e => set('hostedEnvEnabled', e.target.checked)} className="w-4 h-4 accent-sky-600" />
                      <label htmlFor="hostedEnvEnabled" className="text-sm font-medium text-sky-800 cursor-pointer">Include Hosted Environment Section</label>
                    </div>
                    {form.hostedEnvEnabled && (
                      <div className="space-y-3">
                        <Field label="Description"><textarea value={form.hostedEnvDesc} onChange={e => set('hostedEnvDesc', e.target.value)} rows={2} className="w-full px-3 py-2.5 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:border-sky-400 transition resize-none" /></Field>
                        <ImageField label="Environment Image" value={form.hostedEnvImageUrl} onChange={v => set('hostedEnvImageUrl', v)} />
                        <Field label="Environment URL"><Input value={form.hostedUrl} onChange={v => set('hostedUrl', v)} placeholder="https://env.example.com/" /></Field>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Admin Username"><Input value={form.adminUser} onChange={v => set('adminUser', v)} /></Field>
                          <Field label="Admin Password"><Input value={form.adminPass} onChange={v => set('adminPass', v)} /></Field>
                          <Field label="Sysadmin Username"><Input value={form.sysadminUser} onChange={v => set('sysadminUser', v)} /></Field>
                          <Field label="Sysadmin Password"><Input value={form.sysadminPass} onChange={v => set('sysadminPass', v)} /></Field>
                        </div>
                        <Field label="General Password"><Input value={form.generalPass} onChange={v => set('generalPass', v)} /></Field>
                      </div>
                    )}
                  </Section>
                </div>

                <div id="form-section-demo">
                  <Section title="Stakeholder Demo" icon="🎬" color="orange" onActive={() => scrollToPreview('section-demo')}>
                    <Field label="Section Title"><textarea value={form.demoTitle} onChange={e => set('demoTitle', e.target.value)} rows={2} className="w-full px-3 py-2.5 bg-white border border-orange-100 rounded-xl text-sm focus:outline-none focus:border-orange-400 transition resize-none" /></Field>
                    <ImageField label="Demo Banner Image" value={form.demoImageUrl} onChange={v => set('demoImageUrl', v)} />
                    <div className="space-y-2 mt-3">
                      {form.demoButtons.map((btn, bi) => (
                        <div key={btn.id} className="flex gap-2 items-center">
                          <span className="text-xs text-gray-400 w-4 shrink-0">{bi + 1}.</span>
                          <input value={btn.label} onChange={e => updateDemoBtn(btn.id, { label: e.target.value })} placeholder="Label" className="flex-1 px-3 py-2 bg-white border border-orange-100 rounded-xl text-sm focus:outline-none" />
                          <input value={btn.url} onChange={e => updateDemoBtn(btn.id, { url: e.target.value })} placeholder="URL" className="flex-1 px-3 py-2 bg-white border border-orange-100 rounded-xl text-sm focus:outline-none" />
                          <button onClick={() => removeDemoBtn(btn.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 size={13} /></button>
                        </div>
                      ))}
                    </div>
                    <button onClick={addDemoBtn} className="mt-3 flex items-center gap-2 text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-2 rounded-xl transition"><Plus size={13} /> Add Button</button>
                  </Section>
                </div>

                <div id="form-section-footer">
                  <Section title="Footer" icon="📝" color="indigo" onActive={() => scrollToPreview('section-footer')} defaultOpen={false}>
                    <Field label="Footer Text"><Input value={form.footerText} onChange={v => set('footerText', v)} placeholder="Bring Innovation !!!" /></Field>
                  </Section>
                </div>
              </div>
            )}
          </div>

          <div className={`lg:sticky lg:top-24 ${activeTab === 'form' ? 'hidden lg:block' : ''}`}>
            {sendStatus && <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">{sendStatus}</div>}
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-indigo-500" />
              <span className="font-bold text-gray-800 text-sm">Live Email Preview</span>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-xl bg-gray-100">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-200 border-b border-gray-300">
                <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 mx-3 px-3 py-1 bg-white rounded-md text-[10px] text-gray-500 font-mono text-center truncate">{previewFilename}</div>
              </div>
              <iframe ref={iframeRef} title="Preview" srcDoc={emailHTML} className="w-full" style={{ height: 'calc(100vh - 180px)', minHeight: '600px', border: 'none' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
