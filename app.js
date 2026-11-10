const initialJobs = [
 {id:1,title:"Frontend Developer",company:"Northstar Digital",category:"Technology",location:"Hyderabad",type:"Full-time",salary:"₹4–6 LPA",description:"Build responsive user interfaces with HTML, CSS and JavaScript. Collaborate with designers and backend engineers to deliver accessible web experiences."},
 {id:2,title:"Python Developer Intern",company:"CodeSpring Labs",category:"Technology",location:"Remote",type:"Internship",salary:"₹15k/month",description:"Work with a small engineering team on Python applications, APIs and automation tasks. Suitable for students and fresh graduates."},
 {id:3,title:"UI/UX Designer",company:"PixelCraft Studio",category:"Design",location:"Bengaluru",type:"Full-time",salary:"₹3–5 LPA",description:"Create wireframes, prototypes and clean user experiences. A portfolio and knowledge of Figma are helpful."},
 {id:4,title:"Digital Marketing Associate",company:"BrightReach",category:"Marketing",location:"Vijayawada",type:"Full-time",salary:"₹2.5–4 LPA",description:"Support social media campaigns, content planning and performance reporting. Great communication and curiosity are valued."},
 {id:5,title:"Business Analyst Trainee",company:"Nexora Consulting",category:"Business",location:"Pune",type:"Trainee",salary:"₹3–4 LPA",description:"Help teams understand business requirements, prepare reports and document process improvements."},
 {id:6,title:"React Developer",company:"CloudPeak Systems",category:"Technology",location:"Remote",type:"Contract",salary:"₹5–7 LPA",description:"Develop reusable React components and integrate REST APIs. Familiarity with Git and responsive design is expected."}
];
let jobs = [...initialJobs, ...JSON.parse(localStorage.getItem("jc_custom_jobs") || "[]")];
let applications = JSON.parse(localStorage.getItem("jc_applications") || "[]");
const grid = document.getElementById("jobGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const toast = document.getElementById("toast");
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function renderJobs(){
 const term=searchInput.value.trim().toLowerCase(), cat=categoryFilter.value;
 const filtered=jobs.filter(j=>(!cat||j.category===cat)&&(!term||[j.title,j.company,j.category,j.location].join(" ").toLowerCase().includes(term)));
 document.getElementById("resultCount").textContent=`${filtered.length} ${filtered.length===1?"position":"positions"}`;
 document.getElementById("emptyState").hidden=filtered.length>0;
 grid.innerHTML=filtered.map(j=>`<article class="job-card"><div class="job-top"><span class="company-icon">${escapeHtml(j.company.charAt(0).toUpperCase())}</span><span class="job-type">${escapeHtml(j.type)}</span></div><h3>${escapeHtml(j.title)}</h3><div class="company">${escapeHtml(j.company)}</div><div class="job-meta"><span>⌖ ${escapeHtml(j.location)}</span><span>${escapeHtml(j.category)}</span></div><div class="job-actions"><span class="salary">${escapeHtml(j.salary||"Salary not listed")}</span><button data-details="${j.id}">View details ↗</button></div></article>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-details]");if(!b)return;const j=jobs.find(x=>x.id===Number(b.dataset.details));if(!j)return;
 document.getElementById("dialogCategory").textContent=j.category.toUpperCase();
 document.getElementById("dialogTitle").textContent=j.title;
 document.getElementById("dialogCompany").textContent=`${j.company} · ${j.location} · ${j.type}`;
 document.getElementById("dialogDescription").textContent=j.description;
 document.getElementById("dialogMeta").textContent=`Salary: ${j.salary||"Not specified"}`;
 const apply=document.getElementById("applyBtn");apply.onclick=()=>applyFor(j);document.getElementById("jobDialog").showModal();
});
function applyFor(j){
 if(applications.some(a=>a.jobId===j.id)){notify("You have already applied for this job.");return}
 const name=prompt("Enter your name to submit this demo application:");
 if(!name||!name.trim())return;
 applications.push({jobId:j.id,title:j.title,company:j.company,name:name.trim(),status:"Submitted",date:new Date().toLocaleDateString()});
 localStorage.setItem("jc_applications",JSON.stringify(applications));
 document.getElementById("jobDialog").close();notify("Application submitted! Your status is Submitted.");
}
document.getElementById("searchBtn").addEventListener("click",renderJobs);
searchInput.addEventListener("input",renderJobs);categoryFilter.addEventListener("change",renderJobs);
document.querySelectorAll("[data-search]").forEach(b=>b.addEventListener("click",()=>{searchInput.value=b.dataset.search;renderJobs();document.getElementById("jobs").scrollIntoView()}));
const postDialog=document.getElementById("postDialog");
document.getElementById("openPost").addEventListener("click",()=>postDialog.showModal());
document.getElementById("closePost").addEventListener("click",()=>postDialog.close());
document.getElementById("postForm").addEventListener("submit",e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);
 const newJob={id:Date.now(),title:data.get("title"),company:data.get("company"),category:data.get("category"),location:data.get("location"),type:"New listing",salary:"Not specified",description:"This opportunity was added by an employer using the JobConnect demo form."};
 const custom=JSON.parse(localStorage.getItem("jc_custom_jobs")||"[]");custom.unshift(newJob);localStorage.setItem("jc_custom_jobs",JSON.stringify(custom));jobs.unshift(newJob);renderJobs();e.currentTarget.reset();postDialog.close();notify("Job posted in this browser demo.");
});
document.getElementById("jobDialog").addEventListener("click",e=>{if(e.target.id==="jobDialog")e.target.close()});
document.getElementById("postDialog").addEventListener("click",e=>{if(e.target.id==="postDialog")e.target.close()});
renderJobs();
