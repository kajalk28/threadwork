import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useMemo, useRef, useEffect } from "react";

const C = {
  bg: "#f7f7f5", card: "#fff", green: "#5a8a5e", greenLight: "#d4e4d4", greenPale: "#e8f0e8",
  coral: "#e8736c", text: "#2d2d2d", textLight: "#6b6b6b", textMuted: "#999", border: "#e5e5e5",
  navBg: "#f0f0ec", navActive: "#3b7dd8", white: "#fff", msgBg: "#f2f2ee", overlay: "rgba(0,0,0,0.4)",
  bubble: "#5a8a5e", bubbleText: "#fff", bubbleOther: "#e9e9e9", bubbleOtherText: "#2d2d2d",
};

const Web = ({ s = 28 }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke={C.green} strokeWidth="1.5" fill="none"/>
    <circle cx="20" cy="20" r="10" stroke={C.green} strokeWidth="1" fill="none"/>
    <circle cx="20" cy="20" r="4" stroke={C.green} strokeWidth=".8" fill="none"/>
    <line x1="20" y1="2" x2="20" y2="38" stroke={C.green} strokeWidth=".8"/>
    <line x1="2" y1="20" x2="38" y2="20" stroke={C.green} strokeWidth=".8"/>
    <line x1="7" y1="7" x2="33" y2="33" stroke={C.green} strokeWidth=".8"/>
    <line x1="33" y1="7" x2="7" y2="33" stroke={C.green} strokeWidth=".8"/>
  </svg>
);

const Av = ({ n, s = 40, c }) => {
  const cols = c || ["#5a8a5e","#87ceeb"];
  return (
    <svg width={s} height={s} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="25" fill={cols[0]} opacity=".3"/>
      <circle cx="25" cy="15" r="8" fill={cols[1]} opacity=".5"/>
      <ellipse cx="25" cy="38" rx="14" ry="10" fill={cols[1]} opacity=".3"/>
      <text x="25" y="28" textAnchor="middle" fontSize="14" fill={C.text} fontWeight="600">{n?.[0]?.toUpperCase()||"?"}</text>
    </svg>
  );
};

const Btn = ({ children, onClick, style, outline, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? C.textMuted : outline ? "none" : C.green, color: outline ? C.green : C.white,
    border: outline ? `1.5px solid ${C.green}` : "none", borderRadius: 18,
    padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: disabled?"default":"pointer", opacity: disabled?.5:1, ...style,
  }}>{children}</button>
);

const Input = ({ label, value, onChange, area, placeholder, maxLen }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: C.textLight }}>{label}</label>
      {maxLen && <span style={{ fontSize:11, color: value.length > maxLen ? C.coral : C.textMuted }}>{value.length}/{maxLen}</span>}
    </div>}
    {area ? (
      <textarea value={value} onChange={e=> onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", minHeight:80, border:`1px solid ${C.border}`, borderRadius:10, padding:10, fontSize:13, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box", outline:"none" }}/>
    ) : (
      <input value={value} onChange={e=> onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 10px", fontSize:13, fontFamily:"inherit", boxSizing:"border-box", outline:"none" }}/>
    )}
  </div>
);

const Modal = ({ children, onClose, title }) => (
  <div style={{ position:"fixed", inset:0, background:C.overlay, zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
    <div style={{ background:C.bg, borderRadius:"18px 18px 0 0", width:"100%", maxWidth:390, maxHeight:"88vh", overflow:"auto", padding:"0 0 20px" }} onClick={e=>e.stopPropagation()}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px 10px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:C.bg, zIndex:2 }}>
        <span style={{ fontWeight:800, fontSize:16, color:C.text }}>{title}</span>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:C.textMuted, padding:0 }}>✕</button>
      </div>
      <div style={{ padding:"16px 18px" }}>{children}</div>
    </div>
  </div>
);

const Toast = ({ msg }) => (
  <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:C.green, color:C.white, padding:"10px 24px", borderRadius:20, fontSize:13, fontWeight:600, zIndex:200, boxShadow:"0 4px 14px rgba(0,0,0,.15)", animation:"fadeIn .3s", whiteSpace:"nowrap" }}>{msg}</div>
);

const CAT = {
  collab: { label:"Collaboration, Service Offer", color:C.green },
  question: { label:"Question", color:"#3b7dd8" },
  link: { label:"Helpful Link", color:"#9b59b6" },
  showcase: { label:"Showcase", color:C.coral },
};

const SearchBar = ({ value, onChange, placeholder="Search here ..." }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:C.greenPale }}>
    <Web s={32}/>
    <div style={{ flex:1, display:"flex", alignItems:"center", background:C.white, borderRadius:20, padding:"8px 14px", border:`1px solid ${C.border}` }}>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{ border:"none", outline:"none", flex:1, fontSize:14, color:C.text, background:"transparent" }}/>
      {value ? (
        <button onClick={()=>onChange("")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, color:C.textMuted, fontSize:16 }}>✕</button>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      )}
    </div>
  </div>
);

const INIT_POSTS = [
  { id:1, user:"mariadesigns", category:"collab", tags:"Artist", body:"hello! I am an artist looking for some experience designing book covers. Is there anyone here who has written a manuscript, short story collection, poetry anthology, etc. that would like to work with me? It could be great for both our portfolios!", replies:[
    { user:"alexwriter", text:"hi! I wrote a short story and was looking for someone to work with to create cover art!! I also wanted to work on making a graphic novel next, would you like to join my project? DM me and I can add you!" },
    { user:"sarahink", text:"omg I am an artist as well that has been wanting to work on graphic novels too! I love webtoons and want to get into that kinda stuff, can I send you some of my portfolio?" },
  ]},
  { id:2, user:"jakecuts", category:"question", tags:"Video Editors", body:"hi, I am a video editor and I usually use Premiere Pro but my company wants me to use DaVinci. Does anyone know the Mac hotkey for splicing videos in the timeline?", replies:[
    { user:"editpro_sam", text:"use B for simply splicing clips but if you want to do an in and out point you can do Cmd+Opt+B to split at the in point, and Cmd+Shift+B to split at the out point." },
    { user:"jakecuts", isOP:true, text:"ahhh thank you so much I was literally struggling. oh by the way I saw in your profile you have a project open for filming in Boston, I'm in Roxbury so would be happy to help with camera or post-production!!" },
  ]},
  { id:3, user:"cinelunaaa", category:"link", tags:"Filmmakers", body:"hey everyone! I found this amazing free sound design library that has tons of royalty-free ambient sounds perfect for short films. It's been a lifesaver for my student projects. Dropping the link here for anyone who needs it!", replies:[
    { user:"soundscapemax", text:"this is incredible, thank you! I've been looking for good ambient tracks for my documentary project." },
  ]},
  { id:4, user:"priya_frames", category:"showcase", tags:"Cinematography", body:"just wrapped my first short film as lead DP! We shot on an FX3 with vintage Helios lenses and I'm so proud of how the color grade turned out. Looking for feedback from other cinematographers — would love constructive criticism before I submit to festivals!", replies:[
    { user:"lensmasterk", text:"the Helios look is so dreamy for narrative work, would love to see some stills! Drop them in the cinematography group chat?" },
  ]},
];

const INIT_JOBS = [
  { id:1, company:"Moonrise Pictures", position:"Production Assistant", dept:"Production", location:"Brooklyn, NY", type:"Full-time, On-set", desc:"We are looking for a motivated PA for our upcoming indie feature filming in Brooklyn this summer. Must be able to lift 30lbs and have reliable transportation. Great opportunity for emerging filmmakers!", qualifications:"Prior on-set experience preferred\nReliable transportation\nAble to lift 30lbs\nStrong communication skills", desired:"Interest in indie filmmaking\nKnowledge of set etiquette\nFlexible schedule", questions:["Why are you interested in working on an indie feature?","Describe a time you worked well under pressure on a fast-paced team.","Are you available for the full summer shoot schedule?"] },
  { id:2, company:"Vox Creative Studio", position:"Junior Motion Designer", dept:"Post-Production", location:"Remote", type:"Full-time", desc:"Seeking a junior motion graphics designer to join our post-production team. After Effects experience required, Cinema 4D a plus. Remote-friendly with flexible hours. Perfect for recent graduates!", qualifications:"After Effects proficiency\nStrong design fundamentals\nPortfolio of motion work", desired:"Cinema 4D experience\nIllustration skills\nDegree in design or related field", questions:["Share a link to your best motion design piece and tell us why it represents your style.","What inspires your creative process?","How do you handle feedback and revisions on your work?"] },
  { id:3, company:"Northlight Media", position:"Video Editor Intern", dept:"Editorial", location:"Boston, MA", type:"Paid Internship, 3 months", desc:"Paid internship for an aspiring editor to work alongside our senior editorial team on branded content and short docs. DaVinci Resolve proficiency preferred. Boston-based, 3 month commitment.", qualifications:"DaVinci Resolve or Premiere Pro skills\nBasic color correction knowledge\nAbility to commit 3 months", desired:"Documentary editing interest\nStorytelling sensibility\nCurrently enrolled or recent graduate", questions:["What editing software are you most comfortable with and why?","Tell us about a project where you had to tell a story through editing alone.","What kind of documentary topics are you passionate about?"] },
  { id:4, company:"Ember & Ash Productions", position:"Sound Recordist", dept:"Sound", location:"Western MA", type:"Freelance, 2 weeks", desc:"Looking for a boom operator / sound recordist for a 2-week shoot in Western MA. Gear provided. Prior on-set experience preferred but passionate learners welcome!", qualifications:"Basic understanding of production audio\nAvailability for 2-week shoot\nWillingness to travel", desired:"Own gear (not required)\nExperience with boom operation\nFamiliarity with timecode sync", questions:["Do you have any experience recording production audio?","What's your availability for the 2-week shoot window?"] },
];

const CHAT_DATA = {
  1:{ name:"Maria D.", msgs:[
    { from:"them", text:"hey Kajal! I saw your post about Rest Stop and I'd love to help with the visual direction", time:"10:02 AM" },
    { from:"me", text:"omg Maria!! yes that would be amazing, I've been looking for someone with your eye for design", time:"10:05 AM" },
    { from:"them", text:"I was thinking we could do a moodboard session this week? I have some ideas for the color palette", time:"10:06 AM" },
    { from:"me", text:"yes absolutely! are you free Thursday afternoon?", time:"10:08 AM" },
    { from:"them", text:"Thursday works! there's a cute cafe on Newbury that has great lighting for looking at reference photos", time:"10:10 AM" },
    { from:"me", text:"perfect let's do it! I'll bring my laptop with the script and some visual references", time:"10:12 AM" },
    { from:"them", text:"sounds great! let's meet at the cafe to discuss the cover art and I'll bring my iPad for sketching", time:"10:15 AM" },
  ]},
  2:{ name:"Jake C.", msgs:[
    { from:"them", text:"yo Kajal! finally finished the rough cut of that scene we talked about", time:"9:30 AM" },
    { from:"me", text:"no way!! send it over I've been dying to see it", time:"9:32 AM" },
    { from:"them", text:"just airdropped it to your email, it's like 4 minutes long", time:"9:33 AM" },
    { from:"me", text:"got it! watching now...", time:"9:40 AM" },
    { from:"me", text:"Jake this is SO good the pacing in the second half is chef's kiss", time:"9:44 AM" },
    { from:"them", text:"hey! just sent you the rough cut, let me know what you think about the color grade too", time:"9:45 AM" },
  ]},
  3:{ name:"Sam E.", msgs:[
    { from:"them", text:"update on the Boston shoot — location is locked in!", time:"Yesterday" },
    { from:"me", text:"amazing!! which location did we end up getting?", time:"Yesterday" },
    { from:"them", text:"the warehouse in Southie, they gave us the whole weekend", time:"Yesterday" },
    { from:"me", text:"that's the dream spot! I'll start putting together the shot list", time:"Yesterday" },
    { from:"them", text:"the Boston shoot is confirmed for March 15th!", time:"11:00 AM" },
  ]},
  4:{ name:"Priya F.", msgs:[
    { from:"me", text:"hey Priya! have you ever used the Helios 44-2? thinking about it for my next project", time:"Yesterday" },
    { from:"them", text:"YES it's my absolute favorite vintage lens!! the swirly bokeh is unmatched", time:"Yesterday" },
    { from:"me", text:"that's exactly the look I'm going for. where did you get yours?", time:"Yesterday" },
    { from:"them", text:"eBay actually, got it for like $60. make sure you get the M42 to E-mount adapter too", time:"Yesterday" },
    { from:"them", text:"thanks for the lens recommendation, it's exactly what I needed for the festival submission!", time:"2:00 PM" },
  ]},
  5:{ name:"Luna C.", msgs:[
    { from:"them", text:"hiii I saw your post about needing sound design for Rest Stop!", time:"Tuesday" },
    { from:"me", text:"yes!! are you interested? I loved the soundscape work on your portfolio", time:"Tuesday" },
    { from:"them", text:"do you want to collaborate on the sound design project? I have some ideas already!", time:"Tuesday" },
  ]},
  6:{ name:"Alex W.", msgs:[
    { from:"them", text:"the short story is coming along so well, I think the ending finally clicks", time:"Monday" },
    { from:"me", text:"I can't wait to read it!! Maria is already sketching cover concepts", time:"Monday" },
    { from:"them", text:"just finished the first draft! sending it over now...", time:"Monday" },
  ]},
  7:{ name:"Sarah I.", msgs:[
    { from:"me", text:"Sarah your latest illustration series is incredible!!", time:"Saturday" },
    { from:"them", text:"loved your portfolio! especially the watercolor series you posted last week", time:"Saturday" },
  ]},
};

const MSGS_LIST = [
  { id:1, name:"Maria D.", preview:"sounds great! let's meet at the cafe to discuss the cover art...", time:"2m", unread:true },
  { id:2, name:"Jake C.", preview:"hey! just sent you the rough cut, let me know what you think", time:"15m", unread:true },
  { id:3, name:"Sam E.", preview:"the Boston shoot is confirmed for March 15th!", time:"1h" },
  { id:4, name:"Priya F.", preview:"thanks for the lens recommendation, it's exactly what I needed", time:"3h" },
  { id:5, name:"Luna C.", preview:"do you want to collaborate on the sound design project?", time:"5h" },
  { id:6, name:"Alex W.", preview:"just finished the first draft! sending it over now...", time:"1d" },
  { id:7, name:"Sarah I.", preview:"loved your portfolio! especially the watercolor series", time:"2d" },
];

const PINNED = [{ name:"Maria D.", id:1 },{ name:"Jake C.", id:2 },{ name:"Sam E.", id:3 },{ name:"Priya F.", id:4 }];

const STATUS_COLORS = {
  "Under Review":{ bg:"#fff3e0", text:"#e65100" },
  "Interview Scheduled":{ bg:"#e8f5e9", text:"#2e7d32" },
  "Application Received":{ bg:"#e3f2fd", text:"#1565c0" },
  "Not Selected":{ bg:"#fce4ec", text:"#c62828" },
};

const ImagePicker = ({ images, setImages }) => {
  const fileRef = useRef(null);
  const addImage = e => {
    const files = Array.from(e.target.files || []);
    files.forEach(f => {
      const r = new FileReader();
      r.onload = ev => setImages(p => [...p, ev.target.result].slice(0, 4));
      r.readAsDataURL(f);
    });
    e.target.value = "";
  };
  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={addImage} style={{ display:"none" }} />
      {images.length > 0 && (
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
          {images.map((img, i) => (
            <div key={i} style={{ position:"relative", width:72, height:72, borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}` }}>
              <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <button onClick={() => setImages(p => p.filter((_, idx) => idx !== i))}
                style={{ position:"absolute", top:2, right:2, background:"rgba(0,0,0,0.5)", color:C.white, border:"none", borderRadius:"50%", width:20, height:20, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>✕</button>
            </div>
          ))}
        </div>
      )}
      {images.length < 4 && (
        <button onClick={() => fileRef.current?.click()}
          style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:10, padding:"8px 14px", fontSize:12, color:C.navActive, cursor:"pointer", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.navActive} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          {images.length === 0 ? "Add Images (up to 4)" : `Add More (${images.length}/4)`}
        </button>
      )}
    </div>
  );
};

const PostCard = ({ post, onEdit, onReply }) => {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const cat = CAT[post.category];
  const isOwn = post.user === "kajal_k";
  return (
    <div style={{ background:C.card, borderRadius:14, padding:16, marginBottom:14, border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,.04)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <Av n={post.user} s={36}/>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{post.user}</div>
          <div style={{ fontSize:12, color:cat.color, fontWeight:600 }}>{cat.label}: {post.tags}</div>
        </div>
        {isOwn && (
          <div style={{ position:"relative" }}>
            <button onClick={()=>setMenu(!menu)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, fontSize:18, color:C.textMuted }}>⋯</button>
            {menu && (
              <div style={{ position:"absolute", right:0, top:28, background:C.white, borderRadius:10, boxShadow:"0 4px 16px rgba(0,0,0,.12)", border:`1px solid ${C.border}`, zIndex:10, overflow:"hidden", minWidth:120 }}>
                <button onClick={()=>{setMenu(false);onEdit(post);}} style={{ display:"block", width:"100%", padding:"10px 16px", border:"none", background:"none", cursor:"pointer", fontSize:13, color:C.text, textAlign:"left", fontWeight:500 }}>✏️ Edit Post</button>
              </div>
            )}
          </div>
        )}
      </div>
      <p style={{ fontSize:13.5, color:C.text, lineHeight:1.55, margin:0 }}>{post.body}</p>
      {post.images?.length > 0 && (
        <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
          {post.images.map((img, i) => (
            <div key={i} style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}`, flex: post.images.length === 1 ? "1 1 100%" : "1 1 45%", maxHeight: post.images.length === 1 ? 220 : 140 }}>
              <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
          ))}
        </div>
      )}
      {post.editedAt && <div style={{ fontSize:11, color:C.textMuted, marginTop:4, fontStyle:"italic" }}>edited</div>}
      <div style={{ display:"flex", gap:12, marginTop:10 }}>
        <button onClick={()=>setShowReplyInput(!showReplyInput)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:4, fontSize:12, color:C.textMuted, fontWeight:500 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Reply
        </button>
        {post.replies?.length > 0 && (
          <button onClick={()=>setShow(!show)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, fontSize:12, color:C.navActive, fontWeight:500 }}>
            {show ? "hide replies" : `${post.replies.length} repl${post.replies.length===1?"y":"ies"}`}
          </button>
        )}
      </div>
      {showReplyInput && (
        <div style={{ display:"flex", gap:8, marginTop:10, alignItems:"flex-end" }}>
          <div style={{ flex:1 }}>
            <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Write a reply..."
              style={{ width:"100%", minHeight:50, border:`1px solid ${C.border}`, borderRadius:10, padding:10, fontSize:13, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box", outline:"none" }} />
          </div>
          <button onClick={()=>{
            if(replyText.trim()) {
              onReply(post.id, replyText);
              setReplyText("");
              setShowReplyInput(false);
              setShow(true);
            }
          }} style={{ background:replyText.trim()?C.green:C.border, border:"none", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:replyText.trim()?"pointer":"default", flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      )}
      {show && post.replies?.length > 0 && (
        <div style={{ marginTop:10, paddingLeft:10, borderLeft:`2px solid ${C.greenLight}` }}>
          {post.replies.map((r,i)=>(
            <div key={i} style={{ marginBottom:10, background:C.bg, borderRadius:10, padding:10 }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{r.user} {r.isOP && <span style={{ color:C.coral, fontWeight:600, fontSize:11 }}>original poster</span>}</div>
              <div style={{ fontSize:12.5, color:C.textLight, lineHeight:1.5, marginTop:3 }}>{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EditPost = ({ post, onClose, onSave }) => {
  const [cat, setCat] = useState(post.category);
  const [tags, setTags] = useState(post.tags);
  const [body, setBody] = useState(post.body);
  const [images, setImages] = useState(post.images || []);
  return (
    <Modal title="Edit Post" onClose={onClose}>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:12, fontWeight:600, color:C.textLight, display:"block", marginBottom:6 }}>Post Type</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {Object.entries(CAT).map(([k,v])=>(
            <button key={k} onClick={()=>setCat(k)} style={{
              padding:"6px 14px", borderRadius:16, fontSize:12, fontWeight:600, cursor:"pointer",
              border: cat===k ? "none" : `1px solid ${C.border}`,
              background: cat===k ? v.color : C.white, color: cat===k ? C.white : v.color,
            }}>{v.label.split(",")[0]}</button>
          ))}
        </div>
      </div>
      <Input label="Tags" value={tags} onChange={setTags} placeholder="Who is this for?"/>
      <Input label="Your Post" value={body} onChange={setBody} area placeholder="Write your post here..."/>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:12, fontWeight:600, color:C.textLight, display:"block", marginBottom:6 }}>Images</label>
        <ImagePicker images={images} setImages={setImages} />
      </div>
      <Btn onClick={()=>{ if(body.trim()){ onSave({ ...post, category:cat, tags:tags||"General", body, images, editedAt:Date.now() }); onClose(); }}} style={{ width:"100%" }}>Save Changes</Btn>
    </Modal>
  );
};

const CreatePost = ({ onClose, onSubmit }) => {
  const [cat, setCat] = useState("collab");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  return (
    <Modal title="Create Post" onClose={onClose}>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:12, fontWeight:600, color:C.textLight, display:"block", marginBottom:6 }}>Post Type</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {Object.entries(CAT).map(([k,v])=>(
            <button key={k} onClick={()=>setCat(k)} style={{
              padding:"6px 14px", borderRadius:16, fontSize:12, fontWeight:600, cursor:"pointer",
              border: cat===k ? "none" : `1px solid ${C.border}`,
              background: cat===k ? v.color : C.white, color: cat===k ? C.white : v.color,
            }}>{v.label.split(",")[0]}</button>
          ))}
        </div>
      </div>
      <Input label="Tags (e.g. Filmmaker, Editor, Artist)" value={tags} onChange={setTags} placeholder="Who is this for?"/>
      <Input label="Your Post" value={body} onChange={setBody} area placeholder="Write your post here..."/>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:12, fontWeight:600, color:C.textLight, display:"block", marginBottom:6 }}>Images</label>
        <ImagePicker images={images} setImages={setImages} />
      </div>
      <Btn onClick={()=>{ if(body.trim()){ onSubmit({ id:Date.now(), user:"kajal_k", category:cat, tags:tags||"General", body, images, replies:[] }); onClose(); }}} style={{ width:"100%" }}>Post to Threadwork</Btn>
    </Modal>
  );
};

const PostJob = ({ onClose, onPost }) => {
  const [step, setStep] = useState("verify");
  const [code, setCode] = useState("");
  const [compName, setCompName] = useState("");
  const [compEmail, setCompEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dept, setDept] = useState("");
  const [loc, setLoc] = useState("");
  const [jType, setJType] = useState("");
  const [desc, setDesc] = useState("");
  const [quals, setQuals] = useState("");
  const [nice, setNice] = useState("");
  const [questions, setQuestions] = useState(["",""]);
  const addQ = () => setQuestions(p=>[...p,""]);
  const removeQ = i => setQuestions(p=>p.filter((_,idx)=>idx!==i));
  const updateQ = (i,v) => setQuestions(p=>p.map((q,idx)=>idx===i?v:q));
  const submitJob = () => {
    if(!jobTitle||!desc) return;
    onPost({ id:Date.now(), company:compName||"Your Company", position:jobTitle, dept:dept||"General", location:loc||"Remote", type:jType||"Full-time", desc, qualifications:quals, desired:nice, questions:questions.filter(q=>q.trim()) });
    onClose();
  };
  return (
    <Modal title="Post a Job" onClose={onClose}>
      {step === "verify" && (
        <div>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🏢</div>
            <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>Company Verification Required</div>
            <p style={{ fontSize:13, color:C.textLight, lineHeight:1.6, margin:0 }}>Only registered and approved companies can post job listings on Threadwork.</p>
          </div>
          <Input label="Company Name" value={compName} onChange={setCompName} placeholder="Your company name"/>
          <Input label="Company Email" value={compEmail} onChange={setCompEmail} placeholder="you@company.com"/>
          <Input label="Verification Code" value={code} onChange={setCode} placeholder="Enter your code"/>
          <p style={{ fontSize:11.5, color:C.textMuted, lineHeight:1.5, margin:"0 0 10px" }}>Use code <strong>THREADWORK2026</strong> for this demo, or apply at threadwork.co/employers.</p>
          <Btn onClick={()=>{ if(code==="THREADWORK2026" && compName && compEmail) setStep("form"); else setStep("denied"); }} style={{ width:"100%" }}>Verify & Continue</Btn>
        </div>
      )}
      {step === "denied" && (
        <div style={{ textAlign:"center", padding:"10px 0" }}>
          <div style={{ fontSize:40, marginBottom:10 }}>⚠️</div>
          <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>Verification Unsuccessful</div>
          <p style={{ fontSize:13, color:C.textLight, lineHeight:1.6 }}>We couldn't verify your credentials. Use code THREADWORK2026 for this demo.</p>
          <Btn onClick={()=>setStep("verify")} outline style={{ marginTop:10 }}>Try Again</Btn>
        </div>
      )}
      {step === "form" && (
        <div>
          <div style={{ background:C.greenPale, borderRadius:12, padding:12, marginBottom:16, textAlign:"center" }}>
            <span style={{ fontSize:13, fontWeight:600, color:C.green }}>✓ Verified as {compName}</span>
          </div>
          <div style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:12 }}>Job Details</div>
          <Input label="Job Title *" value={jobTitle} onChange={setJobTitle} placeholder="e.g. Production Assistant"/>
          <Input label="Department" value={dept} onChange={setDept} placeholder="e.g. Production, Post-Production"/>
          <Input label="Location" value={loc} onChange={setLoc} placeholder="e.g. Boston, MA or Remote"/>
          <Input label="Employment Type" value={jType} onChange={setJType} placeholder="e.g. Full-time, Internship, Freelance"/>
          <Input label="Job Description *" value={desc} onChange={setDesc} area placeholder="Describe the role..."/>
          <Input label="Required Qualifications (one per line)" value={quals} onChange={setQuals} area placeholder="e.g.\nAfter Effects proficiency\nStrong communication skills"/>
          <Input label="Nice to Have (one per line)" value={nice} onChange={setNice} area placeholder="e.g.\nCinema 4D experience"/>
          <div style={{ height:1, background:C.border, margin:"8px 0 16px" }}/>
          <div style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:6 }}>Application Questions</div>
          <p style={{ fontSize:12, color:C.textLight, marginBottom:12, lineHeight:1.5 }}>Add custom questions that applicants will answer when they apply.</p>
          {questions.map((q,i)=>(
            <div key={i} style={{ display:"flex", gap:8, marginBottom:8, alignItems:"flex-start" }}>
              <div style={{ flex:1 }}><Input label={`Question ${i+1}`} value={q} onChange={v=>updateQ(i,v)} placeholder="e.g. Why are you excited about this role?"/></div>
              {questions.length > 1 && <button onClick={()=>removeQ(i)} style={{ background:"none", border:"none", color:C.coral, cursor:"pointer", fontSize:18, marginTop:22, padding:4 }}>✕</button>}
            </div>
          ))}
          {questions.length < 5 && <button onClick={addQ} style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:10, padding:"8px 0", width:"100%", fontSize:12, color:C.navActive, cursor:"pointer", fontWeight:500, marginBottom:16 }}>+ Add Another Question</button>}
          <Btn onClick={submitJob} style={{ width:"100%" }}>Publish Job Listing</Btn>
        </div>
      )}
    </Modal>
  );
};

const JobApply = ({ job, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name:"", email:"", portfolio:"", message:"" });
  const [answers, setAnswers] = useState((job.questions||[]).map(()=>""));
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const qs = job.questions || [];
  const canSubmit = form.name && form.email && form.message;
  return (
    <Modal title={`Apply — ${job.position}`} onClose={onClose}>
      <div style={{ background:C.greenPale, borderRadius:12, padding:14, marginBottom:16 }}>
        <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{job.company}</div>
        <div style={{ fontSize:13, color:C.coral, fontWeight:600, marginTop:2 }}>{job.position}</div>
        <div style={{ fontSize:12, color:C.textLight, marginTop:6 }}><span style={{ marginRight:14 }}>📍 {job.location}</span><span>🕐 {job.type}</span></div>
      </div>
      <div style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:12 }}>Your Information</div>
      <Input label="Full Name *" value={form.name} onChange={v=>set("name",v)} placeholder="Your name"/>
      <Input label="Email *" value={form.email} onChange={v=>set("email",v)} placeholder="you@email.com"/>
      <Input label="Portfolio / Website Link" value={form.portfolio} onChange={v=>set("portfolio",v)} placeholder="https://..."/>
      <div style={{ height:1, background:C.border, margin:"4px 0 16px" }}/>
      <div style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:4 }}>Message to Hiring Team *</div>
      <p style={{ fontSize:12, color:C.textLight, marginBottom:8, lineHeight:1.5 }}>Introduce yourself and tell them why you're excited about this opportunity.</p>
      <Input value={form.message} onChange={v=>set("message",v)} area placeholder="Hi! I'm really excited about this role because..." maxLen={500}/>
      {qs.length > 0 && (
        <>
          <div style={{ height:1, background:C.border, margin:"4px 0 16px" }}/>
          <div style={{ fontSize:14, fontWeight:800, color:C.text, marginBottom:4 }}>Application Questions</div>
          <p style={{ fontSize:12, color:C.textLight, marginBottom:12, lineHeight:1.5 }}>The hiring team would like you to answer the following:</p>
          {qs.map((q,i)=>(
            <div key={i} style={{ background:C.bg, borderRadius:12, padding:14, marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:8 }}>{i+1}. {q}</div>
              <textarea value={answers[i]} onChange={e=>{const a=[...answers]; a[i]=e.target.value; setAnswers(a);}}
                placeholder="Your answer..." style={{ width:"100%", minHeight:60, border:`1px solid ${C.border}`, borderRadius:8, padding:10, fontSize:13, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box", outline:"none" }}/>
            </div>
          ))}
        </>
      )}
      <Btn onClick={()=>{ if(canSubmit){ onSubmit(job); onClose(); }}} disabled={!canSubmit} style={{ width:"100%", marginTop:4 }}>Submit Application</Btn>
      <p style={{ fontSize:11, color:C.textMuted, textAlign:"center", marginTop:10 }}>Your Threadwork profile will be shared along with your application.</p>
    </Modal>
  );
};

const JobDetailPage = ({ job, onBack, onApply }) => (
  <div>
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:C.greenPale, borderBottom:`1px solid ${C.border}` }}>
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <Web s={28}/><span style={{ fontWeight:700, fontSize:15, color:C.text }}>Job Details</span>
    </div>
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <Av n={job.company} s={48} c={["#3b7dd8","#a8d8ea"]}/>
        <div>
          <div style={{ fontWeight:800, fontSize:17, color:C.text }}>{job.company}</div>
          <div style={{ fontSize:14, color:C.coral, fontWeight:600 }}>{job.position}</div>
        </div>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
        {[`📍 ${job.location}`,`🕐 ${job.type}`,`🏢 ${job.dept}`].map((t,i)=>(
          <span key={i} style={{ background:C.greenPale, padding:"5px 12px", borderRadius:14, fontSize:12, color:C.text, fontWeight:500 }}>{t}</span>
        ))}
      </div>
      <div style={{ background:C.card, borderRadius:14, padding:16, border:`1px solid ${C.border}`, marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>About This Role</div>
        <p style={{ fontSize:13, color:C.textLight, lineHeight:1.6, margin:0 }}>{job.desc}</p>
      </div>
      {job.qualifications && <div style={{ background:C.card, borderRadius:14, padding:16, border:`1px solid ${C.border}`, marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>Required Qualifications</div>
        {job.qualifications.split("\n").map((q,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <span style={{ color:C.green, fontWeight:700, fontSize:14 }}>✓</span>
            <span style={{ fontSize:13, color:C.textLight }}>{q}</span>
          </div>
        ))}
      </div>}
      {job.desired && <div style={{ background:C.card, borderRadius:14, padding:16, border:`1px solid ${C.border}`, marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>Nice to Have</div>
        {job.desired.split("\n").map((q,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <span style={{ color:C.navActive, fontWeight:700, fontSize:14 }}>+</span>
            <span style={{ fontSize:13, color:C.textLight }}>{q}</span>
          </div>
        ))}
      </div>}
      {job.questions?.length > 0 && (
        <div style={{ background:C.card, borderRadius:14, padding:16, border:`1px solid ${C.border}`, marginBottom:14 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:6 }}>You'll Be Asked</div>
          {job.questions.map((q,i)=>(
            <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
              <span style={{ color:C.coral, fontWeight:700, fontSize:13 }}>{i+1}.</span>
              <span style={{ fontSize:13, color:C.textLight }}>{q}</span>
            </div>
          ))}
        </div>
      )}
      <Btn onClick={()=>onApply(job)} style={{ width:"100%", padding:"12px 0", fontSize:15, borderRadius:14 }}>Apply Now</Btn>
      <p style={{ fontSize:11, color:C.textMuted, textAlign:"center", marginTop:10 }}>Your Threadwork profile will be shared with the employer.</p>
    </div>
  </div>
);

const MyApplications = ({ apps, onBack }) => (
  <div>
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:C.greenPale, borderBottom:`1px solid ${C.border}` }}>
      <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <Web s={28}/><span style={{ fontWeight:700, fontSize:15, color:C.text }}>My Applications</span>
    </div>
    <div style={{ padding:16 }}>
      {apps.length === 0 ? (
        <div style={{ textAlign:"center", padding:"50px 20px", color:C.textMuted }}>
          <div style={{ fontSize:40, marginBottom:10 }}>📋</div>
          <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>No Applications Yet</div>
          <p style={{ fontSize:13, color:C.textLight, lineHeight:1.6 }}>When you apply to jobs, you'll track their status here.</p>
        </div>
      ) : (
        <>
          <div style={{ fontSize:13, color:C.textLight, marginBottom:14 }}>{apps.length} application{apps.length!==1?"s":""}</div>
          {apps.map((app,i)=>{
            const sc = STATUS_COLORS[app.status] || STATUS_COLORS["Application Received"];
            return (
              <div key={i} style={{ background:C.card, borderRadius:14, padding:16, marginBottom:12, border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,.04)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <Av n={app.company} s={40} c={["#3b7dd8","#a8d8ea"]}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{app.company}</div>
                    <div style={{ fontSize:12, color:C.coral, fontWeight:600 }}>{app.position}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:10, fontSize:11, color:C.textMuted }}>
                  <span>📍 {app.location}</span><span>🕐 {app.type}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ background:sc.bg, color:sc.text, padding:"5px 12px", borderRadius:12, fontSize:12, fontWeight:700 }}>{app.status}</span>
                  <span style={{ fontSize:11, color:C.textMuted }}>Applied {app.date}</span>
                </div>
                {app.note && <div style={{ marginTop:10, padding:"10px 12px", background:C.bg, borderRadius:10, fontSize:12, color:C.textLight, lineHeight:1.5 }}>💬 {app.note}</div>}
              </div>
            );
          })}
        </>
      )}
    </div>
  </div>
);

const ChatView = ({ chatId, onBack }) => {
  const chat = CHAT_DATA[chatId];
  const [msgs, setMsgs] = useState(chat?.msgs || []);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);
  const send = () => { if(!input.trim()) return; setMsgs(p=>[...p,{ from:"me", text:input, time:"now" }]); setInput(""); };
  if(!chat) return null;
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:C.greenPale, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <Av n={chat.name} s={36}/>
        <div><div style={{ fontWeight:700, fontSize:15, color:C.text }}>{chat.name}</div><div style={{ fontSize:11, color:C.green, fontWeight:500 }}>Active now</div></div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"14px 14px 80px", background:C.bg }}>
        {msgs.map((m,i)=>{
          const isMe = m.from==="me";
          return (
            <div key={i} style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", marginBottom:8 }}>
              <div style={{ maxWidth:"75%" }}>
                <div style={{ background:isMe?C.bubble:C.bubbleOther, color:isMe?C.bubbleText:C.bubbleOtherText, padding:"10px 14px", fontSize:13.5, lineHeight:1.5, borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px" }}>{m.text}</div>
                <div style={{ fontSize:10, color:C.textMuted, marginTop:3, textAlign:isMe?"right":"left", padding:"0 4px" }}>{m.time}</div>
              </div>
            </div>
          );
        })}
        <div ref={endRef}/>
      </div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:390, background:C.white, borderTop:`1px solid ${C.border}`, padding:"10px 14px 16px", display:"flex", gap:8, alignItems:"center", boxSizing:"border-box" }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Message..."
          style={{ flex:1, border:`1px solid ${C.border}`, borderRadius:20, padding:"10px 16px", fontSize:14, outline:"none", fontFamily:"inherit" }}/>
        <button onClick={send} style={{ background:input.trim()?C.green:C.border, border:"none", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:input.trim()?"pointer":"default", flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
};

const ProfilePage = ({ resume, setResume }) => {
  const [editingResume, setEditingResume] = useState(false);
  const [rForm, setRForm] = useState(resume);
  const SECTIONS = [
    { title:"Project Post", items:[
      { title:"'Rest Stop' — Short Film", desc:"Currently in development. Looking for collaborators — colorist, sound designer, and composer needed. DM if interested!" },
    ]},
    { title:"Portfolio", items:[
      { title:"'Breaking Character' — Short Film (2026)", desc:"Writer, Producer, Assistant Director — A short film about a struggling actress finding her way through the film industry, who realizes the small compromises she makes for her dream start to add up." },
      { title:"'Girls Night' — Short Film (2025)", desc:"Writer, Director, Cinematographer — A short film about a girl who thinks her boyfriend is cheating on her, and decides there is only one logical thing to do: kidnap the cheater and lock them in her basement to sort out the truth." },
    ]},
    { title:"Resources & Help", items:[
      { title:"Free Sound Library", desc:"Collection of royalty-free ambient sounds perfect for student projects" },
      { title:"Festival Submission Tracker", desc:"Spreadsheet template for tracking film festival deadlines and submissions" },
    ]},
  ];
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:C.greenPale }}>
        <Web s={32}/>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </div>
      <div style={{ padding:16, display:"flex", alignItems:"center", gap:14 }}>
        <Av n="K" s={56} c={["#5a8a5e","#c8e6c9"]}/>
        <div>
          <div style={{ fontWeight:800, fontSize:17, color:C.text }}>Kajal Kapoor</div>
          <div style={{ fontSize:12, color:C.coral, fontWeight:500 }}>Film & Media · English · Writing · Directing · Cinematography</div>
        </div>
      </div>
      <div style={{ padding:"0 16px 16px" }}>
        <div style={{ border:`1px solid ${C.border}`, borderRadius:14, padding:16, marginBottom:14, background:C.white }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.coral }}>Resume</div>
            <button onClick={()=>{ if(editingResume){ setResume(rForm); } setEditingResume(!editingResume); }}
              style={{ background:"none", border:`1px solid ${editingResume?C.green:C.border}`, borderRadius:12, padding:"4px 12px", fontSize:12, cursor:"pointer", color:editingResume?C.green:C.textMuted, fontWeight:600 }}>
              {editingResume ? "✓ Save" : "✏️ Edit"}
            </button>
          </div>
          {editingResume ? (
            <div>
              <Input label="Education" value={rForm.education} onChange={v=>setRForm(p=>({...p,education:v}))} area placeholder="Your education..."/>
              <Input label="Experience (one per line)" value={rForm.experience} onChange={v=>setRForm(p=>({...p,experience:v}))} area placeholder="Your experience..."/>
              <Input label="Skills (comma separated)" value={rForm.skills} onChange={v=>setRForm(p=>({...p,skills:v}))} placeholder="e.g. Premiere Pro, DaVinci Resolve"/>
              <Input label="Awards & Honors" value={rForm.awards} onChange={v=>setRForm(p=>({...p,awards:v}))} area placeholder="Any awards, festivals..."/>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom:10 }}><div style={{ fontSize:13, fontWeight:700, color:C.text }}>Education</div><div style={{ fontSize:12.5, color:C.textLight, lineHeight:1.55, whiteSpace:"pre-line", marginTop:2 }}>{resume.education}</div></div>
              <div style={{ marginBottom:10 }}><div style={{ fontSize:13, fontWeight:700, color:C.text }}>Experience</div><div style={{ fontSize:12.5, color:C.textLight, lineHeight:1.55, whiteSpace:"pre-line", marginTop:2 }}>{resume.experience}</div></div>
              {resume.skills && <div style={{ marginBottom:10 }}><div style={{ fontSize:13, fontWeight:700, color:C.text }}>Skills</div><div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4 }}>{resume.skills.split(",").map((s,i)=>s.trim()&&(<span key={i} style={{ background:C.greenPale, padding:"3px 10px", borderRadius:10, fontSize:12, color:C.green, fontWeight:500 }}>{s.trim()}</span>))}</div></div>}
              {resume.awards && <div><div style={{ fontSize:13, fontWeight:700, color:C.text }}>Awards & Honors</div><div style={{ fontSize:12.5, color:C.textLight, lineHeight:1.55, whiteSpace:"pre-line", marginTop:2 }}>{resume.awards}</div></div>}
            </div>
          )}
        </div>
        {SECTIONS.map((sec,i)=>(
          <div key={i} style={{ border:`1px solid ${C.border}`, borderRadius:14, padding:16, marginBottom:14, background:i===2?C.greenPale:C.white }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.coral, marginBottom:10 }}>{sec.title}</div>
            {sec.items.map((item,j)=>(
              <div key={j} style={{ marginBottom:j<sec.items.length-1?12:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{item.title}</div>
                <div style={{ fontSize:12.5, color:C.textLight, lineHeight:1.55, whiteSpace:"pre-line", marginTop:2 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ posts, search, setSearch, onCreatePost, onEditPost, onReply }) => {
  const filtered = useMemo(()=>{
    if(!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(p=> p.body.toLowerCase().includes(q) || p.user.toLowerCase().includes(q) || p.tags.toLowerCase().includes(q) || CAT[p.category]?.label.toLowerCase().includes(q));
  },[posts,search]);
  return (
    <div>
      <SearchBar value={search} onChange={setSearch}/>
      <div style={{ padding:"6px 16px 0" }}>
        <Btn onClick={onCreatePost} style={{ width:"100%", borderRadius:14, padding:"10px 0", fontSize:13 }}>+ Create Post</Btn>
      </div>
      <div style={{ padding:"10px 16px 4px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Av n="K" s={36} c={["#5a8a5e","#c8e6c9"]}/>
          <div><div style={{ fontWeight:700, fontSize:15, color:C.text }}>Welcome!</div><div style={{ fontSize:12.5, color:C.textLight }}>Kajal Kapoor</div></div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>
      <div style={{ padding:"0 16px" }}>
        <h3 style={{ fontSize:16, fontWeight:800, margin:"10px 0 12px", color:C.text }}>{search.trim() ? `Results for "${search}"` : "Recent Posts:"}</h3>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 20px", color:C.textMuted }}><div style={{ fontSize:32, marginBottom:8 }}>🔍</div><div style={{ fontSize:14 }}>No posts matching "{search}"</div></div>
        ) : filtered.map(p=> <PostCard key={p.id} post={p} onEdit={onEditPost} onReply={onReply}/> )}
      </div>
    </div>
  );
};

const JobsPage = ({ jobs, search, setSearch, onApply, onPostJob, viewJob, setViewJob, myApps, showMyApps, setShowMyApps }) => {
  const filtered = useMemo(()=>{
    if(!search.trim()) return jobs;
    const q = search.toLowerCase();
    return jobs.filter(j=> j.company.toLowerCase().includes(q) || j.position.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.location.toLowerCase().includes(q));
  },[jobs,search]);
  if(showMyApps) return <MyApplications apps={myApps} onBack={()=>setShowMyApps(false)}/>;
  if(viewJob) return <JobDetailPage job={viewJob} onBack={()=>setViewJob(null)} onApply={onApply}/>;
  return (
    <div>
      <SearchBar value={search} onChange={setSearch}/>
      <div style={{ padding:"6px 16px 0", display:"flex", gap:8 }}>
        <Btn onClick={onPostJob} outline style={{ flex:1, borderRadius:14, padding:"10px 0", fontSize:13 }}>🏢 Post a Job</Btn>
      </div>
      <div style={{ padding:"10px 16px 6px", textAlign:"center" }}>
        <button onClick={()=>setShowMyApps(true)} style={{ background:C.greenLight, color:C.green, padding:"7px 22px", borderRadius:18, fontSize:13, fontWeight:700, display:"inline-flex", alignItems:"center", gap:6, border:"none", cursor:"pointer" }}>
          Application Portal
          {myApps.length > 0 && <span style={{ background:C.green, color:C.white, borderRadius:"50%", width:20, height:20, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>{myApps.length}</span>}
        </button>
      </div>
      <div style={{ padding:"4px 16px" }}>
        <h3 style={{ fontSize:16, fontWeight:800, margin:"8px 0 12px", color:C.text }}>{search.trim() ? `Jobs matching "${search}"` : "JOBS:"}</h3>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 20px", color:C.textMuted }}><div style={{ fontSize:32, marginBottom:8 }}>💼</div><div style={{ fontSize:14 }}>No jobs matching "{search}"</div></div>
        ) : filtered.map(j=>(
          <div key={j.id} onClick={()=>setViewJob(j)} style={{ background:C.card, borderRadius:14, padding:16, marginBottom:14, border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,.04)", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <Av n={j.company} s={36} c={["#3b7dd8","#a8d8ea"]}/>
              <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14, color:C.text }}>{j.company}</div><div style={{ fontSize:12, color:"#d4738a", fontWeight:600 }}>{j.position}</div></div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            <p style={{ fontSize:13.5, color:C.text, lineHeight:1.55, margin:0 }}>{j.desc}</p>
            <div style={{ display:"flex", gap:8, marginTop:10, fontSize:11, color:C.textMuted }}><span>📍 {j.location}</span><span>🕐 {j.type}</span></div>
            <Btn onClick={e=>{ e.stopPropagation(); onApply(j); }} style={{ marginTop:12 }}>Apply Now</Btn>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesPage = ({ onOpenChat, msgSearch, setMsgSearch }) => {
  const filtered = useMemo(()=>{
    if(!msgSearch.trim()) return MSGS_LIST;
    const q = msgSearch.toLowerCase();
    return MSGS_LIST.filter(m=> m.name.toLowerCase().includes(q) || m.preview.toLowerCase().includes(q));
  },[msgSearch]);
  return (
    <div>
      <SearchBar value={msgSearch} onChange={setMsgSearch} placeholder="Search people and text ..."/>
      <div style={{ padding:"12px 16px" }}>
        <h3 style={{ fontSize:15, fontWeight:800, margin:"0 0 10px", color:C.text }}>Pinned:</h3>
        <div style={{ display:"flex", gap:18, marginBottom:16 }}>
          {PINNED.map((p,i)=>(<div key={i} style={{ textAlign:"center", cursor:"pointer" }} onClick={()=>onOpenChat(p.id)}><Av n={p.name} s={48}/><div style={{ fontSize:11, color:C.textLight, marginTop:4 }}>{p.name}</div></div>))}
        </div>
        <h3 style={{ fontSize:15, fontWeight:800, margin:"0 0 10px", color:C.text }}>{msgSearch.trim() ? `Results for "${msgSearch}"` : "Recents:"}</h3>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"30px 20px", color:C.textMuted }}><div style={{ fontSize:28, marginBottom:8 }}>💬</div><div style={{ fontSize:14 }}>No conversations matching "{msgSearch}"</div></div>
        ) : filtered.map(m=>(
          <div key={m.id} onClick={()=>onOpenChat(m.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 10px", background:m.id%2===0?C.white:C.msgBg, borderRadius:10, marginBottom:4, cursor:"pointer" }}>
            <Av n={m.name} s={40}/>
            <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:m.unread?800:600, fontSize:13.5, color:C.text }}>{m.name}</div><div style={{ fontSize:12, color:C.textLight, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{m.preview}</div></div>
            <div style={{ fontSize:11, color:C.textMuted, flexShrink:0 }}>{m.time}</div>
            {m.unread && <div style={{ width:8, height:8, borderRadius:4, background:C.navActive, flexShrink:0 }}/>}
          </div>
        ))}
      </div>
    </div>
  );
};

const NAV = [
  { key:"home", label:"Home", icon:a=><svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.navActive:"none"} stroke={a?C.navActive:C.textMuted} strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key:"jobs", label:"Jobs", icon:a=><svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.navActive:"none"} stroke={a?C.navActive:C.textMuted} strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { key:"messages", label:"Messages", icon:a=><svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.navActive:"none"} stroke={a?C.navActive:C.textMuted} strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { key:"profile", label:"Profile", icon:a=><svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.navActive:"none"} stroke={a?C.navActive:C.textMuted} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

function App() {
  const [tab, setTab] = useState("profile");
  const [posts, setPosts] = useState(INIT_POSTS);
  const [jobs, setJobs] = useState(INIT_JOBS);
  const [homeSearch, setHomeSearch] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [msgSearch, setMsgSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [applyJob, setApplyJob] = useState(null);
  const [openChat, setOpenChat] = useState(null);
  const [viewJob, setViewJob] = useState(null);
  const [showMyApps, setShowMyApps] = useState(false);
  const [myApps, setMyApps] = useState([
    { company:"Northlight Media", position:"Video Editor Intern", location:"Boston, MA", type:"Paid Internship", status:"Interview Scheduled", date:"Mar 12", note:"We loved your portfolio! We'd like to schedule a 30-min video call." },
    { company:"Moonrise Pictures", position:"Production Assistant", location:"Brooklyn, NY", type:"Full-time, On-set", status:"Under Review", date:"Mar 18", note:null },
  ]);
  const [resume, setResume] = useState({
    education:"B.A. Film & Media Studies and English — Northeastern University, 2026",
    experience:"Writer, Producer, Assistant Director — 'Breaking Character' (2026)\nWriter, Director, Cinematographer — 'Girls Night' (2025)",
    skills:"Premiere Pro, DaVinci Resolve, Cinematography, Screenwriting, Directing, Production Management",
    awards:"BU Student Film Showcase Selection — 'Breaking Character' (2026)",
  });
  const [toast, setToast] = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null), 2500); };
  const handleApply = j => { setViewJob(null); setApplyJob(j); };
  const handleSubmitApp = j => {
    setMyApps(prev=>[{ company:j.company, position:j.position, location:j.location, type:j.type, status:"Application Received", date:"Today", note:null }, ...prev]);
    showToast(`Applied to ${j.company}! 🎉`);
  };
  const handleSaveEdit = updated => { setPosts(p=>p.map(post=> post.id===updated.id ? updated : post)); showToast("Post updated! ✏️"); };
  const handlePostJob = job => { setJobs(p=>[job,...p]); showToast("Job listing published! 🎉"); };
  const handleReply = (postId, text) => {
    setPosts(p => p.map(post => post.id === postId ? { ...post, replies: [...(post.replies||[]), { user:"kajal_k", text }] } : post));
    showToast("Reply posted! 💬");
  };

  if(openChat) {
    return (
      <div style={{ maxWidth:390, margin:"0 auto", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <style>{`@keyframes fadeIn { from { opacity:0; transform: translateX(-50%) translateY(-10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>
        <ChatView chatId={openChat} onBack={()=>setOpenChat(null)}/>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:390, margin:"0 auto", background:C.bg, minHeight:"100vh", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", position:"relative", display:"flex", flexDirection:"column" }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform: translateX(-50%) translateY(-10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>
      {toast && <Toast msg={toast}/>}
      {showCreate && <CreatePost onClose={()=>setShowCreate(false)} onSubmit={p=>{ setPosts(prev=>[p,...prev]); showToast("Post published! 🎉"); }}/>}
      {editPost && <EditPost post={editPost} onClose={()=>setEditPost(null)} onSave={handleSaveEdit}/>}
      {showPostJob && <PostJob onClose={()=>setShowPostJob(false)} onPost={handlePostJob}/>}
      {applyJob && <JobApply job={applyJob} onClose={()=>setApplyJob(null)} onSubmit={handleSubmitApp}/>}
      <div style={{ flex:1, overflowY:"auto", paddingBottom:70 }}>
        {tab==="home" && <HomePage posts={posts} search={homeSearch} setSearch={setHomeSearch} onCreatePost={()=>setShowCreate(true)} onEditPost={p=>setEditPost(p)} onReply={handleReply}/>}
        {tab==="jobs" && <JobsPage jobs={jobs} search={jobSearch} setSearch={setJobSearch} onApply={handleApply} onPostJob={()=>setShowPostJob(true)} viewJob={viewJob} setViewJob={setViewJob} myApps={myApps} showMyApps={showMyApps} setShowMyApps={setShowMyApps}/>}
        {tab==="messages" && <MessagesPage onOpenChat={id=>setOpenChat(id)} msgSearch={msgSearch} setMsgSearch={setMsgSearch}/>}
        {tab==="profile" && <ProfilePage resume={resume} setResume={setResume}/>}
      </div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:390, display:"flex", justifyContent:"space-around", alignItems:"center", padding:"10px 0 14px", background:C.navBg, borderTop:`1px solid ${C.border}`, boxShadow:"0 -2px 10px rgba(0,0,0,.05)" }}>
        {NAV.map(n=>(
          <button key={n.key} onClick={()=>setTab(n.key)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:0 }}>
            {n.icon(tab===n.key)}
            <span style={{ fontSize:10.5, fontWeight:tab===n.key?700:500, color:tab===n.key?C.navActive:C.textMuted }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
