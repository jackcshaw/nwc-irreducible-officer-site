import { replaceOrThrow } from "./replace-or-throw.mjs";

// Audience source profiles drive the browser, standalone templates and context bundles.
export function adaptTool(tool, profile, read, render, rewrite, siteUrl) {
  const spec = profile.tools[tool.filename.replace(/\.md$/, '')];
  if (!spec) throw new Error(`Missing ${profile.id} adaptation: ${tool.filename}`);
  const title = `${profile.label}: ${spec.title}`;
  let md = read('templates/' + tool.filename);
  const at = (what) => `${profile.id}/${tool.filename}: ${what}`;
  const intro = `## Audience and readiness\n\nSelected setting: ${profile.label}. ${profile.status}\n\nAsk one question at a time and wait. The educator owns the decisions. Preserve their actual task; the fictional example below is optional. Record support, proposals, and unanswered questions.\n\n${profile.readiness}\n\n${profile.responsibility}\n\n## ${spec.title}\n\n${spec.guidance}\n\n### Optional worked example: ${profile.case}\n\nAuthored, fictional example; not a classroom result or captured model response.\n\n${profile.facts}\n\n${profile.baseline}\n\nEducator/facilitator note — hold until the initial judgment has been recorded, unless the user requests it: ${profile.change}\n\n${profile.record}\n\n[Read the ${profile.label} guide and reference matrix](${siteUrl}/assets/workbench/audiences/${profile.id}.md)\n\n`;
  md = replaceOrThrow(md, /^# .+$/m, '# ' + title, at('title'));
  md = replaceOrThrow(md, /## Audience and readiness[\s\S]*?(?=## AI Facilitation Block)/, intro, at('audience section'));
  if (profile.id !== 'pme') {
    // Optional: only some templates carry PME-only sentences.
    md = md.replace(/ In PME, this may be a commander or policymaker\./g, '').replace(/ In PME, consider adversary, time horizon, or authority\./g, '');
  }
  if (tool.id === 'assessment') {
    const rows = profile.id === 'pme' ? [
      ['Causal interpretation','Distinguishes temporal association, causal diagnosis, and unknown causes.'],
      ['Purpose and authority','States the recommendation’s purpose and who can authorize action.'],
      ['Reliance and risk','Accepts warranted assistance, challenges unsupported attribution, and explains residual risk.'],
      ['Changed conditions','Reconsiders the recommendation after the new diagnostic evidence.']
    ] : profile.id === 'he' ? [
      ['Frame','States what productivity should mean for this firm and why that standard fits.'],
      ['Evidence','Uses the studies that bear on the chosen standard and says what each measured and whom it followed.'],
      ['Reliance','Accepts accurate study summaries after checking them and refuses the mixed-evidence verdict with a reason.'],
      ['Changed case','Re-asks what productivity means for the call center and adjusts which evidence decides.']
    ] : [
      ['Standard','States a standard of success and why it fits the question; record modeling or hints used.'],
      ['Sources','Uses documents that bear on the standard and notes who wrote them and why.'],
      ['Reliance','Keeps AI claims confirmed by the packet and throws out invented details, with reasons.'],
      ['Changed case','Asks "success by what standard, and for whom?" about the phone policy.']
    ];
    const table = '## Dimensions\n\nUse these example criteria only when this is the educator’s chosen objective. For another task, agree equivalent subject criteria before inspecting work. Mark untaught or unassigned criteria not applicable. The educator determines assessment; these prompts do not validate a score.\n\n| Dimension | Evidence to inspect | Observation and support |\n| --- | --- | --- |\n' + rows.map(r=>'| '+r.join(' | ')+' |  |').join('\n')+'\n\n';
    md = replaceOrThrow(md, /## Dimensions[\s\S]*?(?=## Oral-Defense Question Bank)/, table, at('dimensions'));
    const questions = {
      pme:["Which outage evidence supports a causal claim, and which causes remain unknown?", "Which part of the rollback recommendation would you accept, check, revise, or refuse? Why?", "Who can authorize the action, and what risk would remain?", "What changes when diagnostic evidence identifies a defect in 10 cases?"],
      he:["What should productivity mean for this firm, and why that standard?", "Which AI contribution did you accept, and how did you check it?", "What question did the AI synthesis actually answer?", "For the call center, which study now matters most, and why?"],
      k12:["What standard of success did you use, and why?", "Which AI claim did you keep, and how did you check it?", "What standard does the AI essay use without saying so?", "Is the school phone policy a success? By what standard, and for whom?"]
    }[profile.id];
    md = replaceOrThrow(md, /## Oral-Defense Question Bank[\s\S]*?(?=## Minimal Faculty Note)/,
      '## Explanation and changed-case prompts\n\nAsk one question at a time. These prompts fit the optional worked example; agree equivalent questions for another course objective. Accept accessible ways of explaining.\n\n'+questions.map(q=>'- '+q).join('\n')+'\n\n', at('question bank'));
    const descriptors = {
      pme:['The causal claim or action authority remains unclear.','Some evidence is used, but unknown causes or remaining risk need further examination.','The recommendation fits the inspected evidence and assigned authority; limits are explained.','The recommendation is reconsidered coherently when diagnostic evidence changes.'],
      he:['The memo’s standard is unstated or inherited from the synthesis.','A standard is stated, but the evidence used does not bear on it.','The standard fits the firm, the evidence bears on it, and reliance decisions are explained.','The learner re-frames coherently for the call center and explains what changed.'],
      k12:['The standard of success is not yet stated; record what needs teaching.','A standard is stated; record the hint or modeling needed to connect evidence to it.','The student defends a standard with checked evidence, with support recorded.','The student carries the standard-setting question to the phone policy without prompting.']
    }[profile.id];
    md = replaceOrThrow(md, /## Provisional discussion scale[\s\S]*?(?=## Dimensions)/,
      '## Provisional discussion scale\n\nOptional descriptions for educator discussion, not validated scores or automatic grades. Record support separately; these categories do not establish independence or durable learning. Mark untaught or unassigned criteria not applicable.\n\n| Description | Evidence in this task |\n| --- | --- |\n'+descriptors.map((d,i)=>'| '+(i+1)+' | '+d+' |').join('\n')+'\n\n', at('discussion scale'));
    md = replaceOrThrow(md, /## Minimal Faculty Note[\s\S]*/, '## Minimal educator note\n\n1. Learning objective and assigned choice.\n2. Actual explanation or decision.\n3. Support supplied and what remains unclear.\n4. Evidence used to accept, check, revise, or refuse.\n5. Response to the changed case.\n6. Next instructional step; unobserved outcomes stay open.\n', at('faculty note'));
    if (profile.id === 'k12') {
      md = replaceOrThrow(md, 'an oral defense', 'a short explanation', at('k12 oral defense'), { all: true });
      md = replaceOrThrow(md, 'oral-defense', 'explanation', at('k12 oral-defense'), { all: true });
      md = replaceOrThrow(md, 'faculty member', 'teacher', at('k12 faculty member'), { all: true });
      md = replaceOrThrow(md, 'Use this rubric when the assignment goal is to make ownership visible in AI-enabled work.', 'Use these observation prompts to inspect a defended argument, with support recorded.', at('k12 rubric intro'));
    }
  }
  // Render routes before making the raw Markdown portable outside its folder.
  const html = render(rewrite(md), {skipFirstH1:true});
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (all,label,href)=> {
    if (/^(https?:|#)/.test(href)) return all;
    const target=href.replace(/^(\.\.\/)+/,'').replace(/^\.\//,'');
    const name=target.split('/').pop();
    if (target.startsWith('concepts/')) return `[${label}](${siteUrl}/assets/workbench/${target})`;
    if (target.startsWith('framework/')) return `[${label}](${siteUrl}/assets/workbench/${profile.id}/framework.md)`;
    if (target.startsWith('audiences/')) return `[${label}](${siteUrl}/assets/workbench/audiences/${profile.id}.md)`;
    return `[${label}](${siteUrl}/assets/workbench/${profile.id}/${name})`;
  });
  return {...tool, title, cardDesc:spec.title, useNote:spec.guidance, html, markdown:md.trim(), downloadPath:`assets/workbench/${profile.id}/${tool.filename}`};
}

export function matrixMarkdown(p) {
  return `# ${p.label} reference matrix\n\nStatus: ${p.status}\n\n${p.readiness}\n\n${p.responsibility}\n\nChoose practices by the learning objective. The phases are a design lens, not an age ladder; supervision is optional.\n\n| Practice | Learner | Educator | Institution |\n| --- | --- | --- | --- |\n${p.rows.map(r=>'| '+r.join(' | ')+' |').join('\n')}\n\n## Evidence needed\n\n${p.trial}\n\nEvidence in one audience does not validate another. These proposed practices do not establish learning gains or certification.\n`;
}

export function matrixSvg(p, escape) {
  // A readable standalone diagram; the website uses responsive HTML from the same rows.
  const wrap=(s,n=36)=>s.split(/\s+/).reduce((lines,w)=>{if (!lines.length || lines.at(-1).length+w.length+1>n) lines.push(w); else lines[lines.length-1]+=' '+w;return lines;},[]);
  const text=(s,x,y,n=36,size=18)=>`<text x="${x}" y="${y}" font-size="${size}">${wrap(s,n).map((l,i)=>`<tspan x="${x}" dy="${i?25:0}">${escape(l)}</tspan>`).join('')}</text>`;
  let y=200, body='';
  for(const row of p.rows){ const h=Math.max(...row.map((s,i)=>wrap(s,i?36:14).length))*25+35; body+=`<path d="M30 ${y-24}H1280" stroke="#bcb4a7"/>`+row.map((s,i)=>text(s,[30,205,570,935][i],y,i?36:14)).join('');y+=h; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1310 ${y+65}" role="img" aria-labelledby="title desc"><title id="title">${escape(p.label)} reference matrix</title><desc id="desc">${escape(p.status)} Six optional practices with learner, educator and institution responsibilities.</desc><rect width="1310" height="100%" fill="#f6f1e8"/><g fill="#0a2242" font-family="Georgia, serif">${text(p.label+' reference matrix',30,50,70,32)}${text(p.status,30,88,115,18)}${['Practice','Learner','Educator','Institution'].map((s,i)=>text(s,[30,205,570,935][i],150)).join('')}${body}${text('Choose by objective and readiness. Supervision is optional; this is not an age ladder.',30,y+20,120,18)}</g></svg>`;
}
