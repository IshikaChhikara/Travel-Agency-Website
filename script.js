// ============================================================
//  PLACE DATA
// ============================================================
const placeData = {
  "Paris":      { desc:"City of love, famous for the iconic Eiffel Tower, world-class cuisine & romantic walks along the Seine.", icon:"🗼", bg:"linear-gradient(135deg,#667eea,#764ba2)", days:5 },
  "Dubai":      { desc:"A dazzling luxury city with the world's tallest tower, indoor skiing & stunning desert safaris.", icon:"🏙️", bg:"linear-gradient(135deg,#f7971e,#ffd200)", days:4 },
  "Maldives":   { desc:"Crystal-clear turquoise waters, pristine white beaches, overwater bungalows & vibrant coral reefs.", icon:"🏝️", bg:"linear-gradient(135deg,#00b4db,#0083b0)", days:6 },
  "Japan":      { desc:"A perfect blend of futuristic technology, ancient temples, cherry blossoms & incredible food culture.", icon:"⛩️", bg:"linear-gradient(135deg,#f953c6,#b91d73)", days:7 },
  "Switzerland":{ desc:"Breathtaking Alpine landscapes, pristine lakes, charming villages & world-famous chocolate.", icon:"🏔️", bg:"linear-gradient(135deg,#4facfe,#00f2fe)", days:7 },
  "Thailand":   { desc:"Vibrant beaches, bustling street food markets, ancient temples & legendary nightlife.", icon:"🌴", bg:"linear-gradient(135deg,#43e97b,#38f9d7)", days:5 },
  "Bali":       { desc:"A magical island of terraced rice fields, Hindu temples, surf beaches & spiritual wellness retreats.", icon:"🌺", bg:"linear-gradient(135deg,#fa709a,#fee140)", days:5 },
  "Italy":      { desc:"Timeless art, ancient ruins, world's best pasta, wine valleys & breathtaking coastal towns.", icon:"🏛️", bg:"linear-gradient(135deg,#a18cd1,#fbc2eb)", days:7 },
  "Turkey":     { desc:"Where East meets West — hot air balloons over Cappadocia, bazaars, hammams & coastal paradise.", icon:"🕌", bg:"linear-gradient(135deg,#f77062,#fe5196)", days:6 },
  "London":     { desc:"Iconic landmarks, royal palaces, world-class museums, theatre & the famous double-decker buses.", icon:"🎡", bg:"linear-gradient(135deg,#30cfd0,#330867)", days:6 },
  "Goa":        { desc:"India's beach paradise with golden sands, Portuguese heritage, seafood shacks & lively beach parties.", icon:"🌊", bg:"linear-gradient(135deg,#ff9a9e,#fad0c4)", days:4 },
  "Manali":     { desc:"Snow-capped Himalayan peaks, river valleys, adventure sports & the gateway to Spiti & Leh.", icon:"🏔️", bg:"linear-gradient(135deg,#89f7fe,#66a6ff)", days:5 },
  "New York":   { desc:"The city that never sleeps — Broadway, Times Square, Central Park, Wall Street & world-class skyline.", icon:"🗽", bg:"linear-gradient(135deg,#ffecd2,#fcb69f)", days:7 },
  "Santorini":  { desc:"Iconic white-washed buildings with blue domes, jaw-dropping sunsets & volcanic hot springs.", icon:"🌅", bg:"linear-gradient(135deg,#a1c4fd,#c2e9fb)", days:6 },
  "Shimla":     { desc:"The Queen of Hills — colonial architecture, pine forests, toy train rides & snow in winter.", icon:"🏡", bg:"linear-gradient(135deg,#d4fc79,#96e6a1)", days:4 }
};


// ============================================================
//  OPEN PLACE → goes to form.html
// ============================================================
function openPlace(place, price, desc, type){
  localStorage.setItem("selectedPlace", place);
  localStorage.setItem("selectedPrice", price);
  localStorage.setItem("selectedDesc", desc || (placeData[place] && placeData[place].desc) || "Amazing destination");
  localStorage.setItem("selectedType", type || "city");
  window.location.href = "form.html";
}


// ============================================================
//  SEARCH
// ============================================================
function searchPlace(){
  let input = document.getElementById("search")?.value.toLowerCase() || "";
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "block" : "none";
  });
}


// ============================================================
//  FILTERS
// ============================================================
function applyFilters(){
  let budget   = document.getElementById("budgetFilter")?.value || "";
  let location = document.getElementById("locationFilter")?.value || "";
  let rating   = document.getElementById("ratingFilter")?.value || "";

  document.querySelectorAll(".card").forEach(card => {
    let price  = parseInt(card.dataset.price);
    let type   = card.dataset.type?.toLowerCase() || "";
    let rate   = card.dataset.rating;
    let show   = true;

    if(budget === "low"  && price > 50000)  show = false;
    if(budget === "high" && price <= 50000) show = false;
    if(location && location !== type)       show = false;
    if(rating   && rating   !== rate)       show = false;

    card.style.display = show ? "block" : "none";
  });
}


// ============================================================
//  AUTO PERSONS
// ============================================================
function setPersons(){
  let type    = document.getElementById("travelType")?.value;
  let persons = document.getElementById("persons");
  if(!persons) return;
  const map = { Solo:1, Couple:2, Family:4, Friends:6 };
  if(map[type]) persons.value = map[type];
}


// ============================================================
//  LOAD PAGE DATA
// ============================================================
window.onload = function(){

  let place = localStorage.getItem("selectedPlace");
  let image = localStorage.getItem("selectedImage");
  let price = localStorage.getItem("selectedPrice");
  let desc  = localStorage.getItem("selectedDesc");
  let info  = place ? placeData[place] : null;

  // ---- FORM PAGE ----
  let placeNameEl = document.getElementById("placeName");
  if(placeNameEl){
    placeNameEl.innerText = place || "Destination";

    let descEl  = document.getElementById("desc");
    let priceEl = document.getElementById("price");
    let heroEl  = document.getElementById("placeHero");
    let iconEl  = document.getElementById("placeIcon");

    if(descEl)  descEl.innerText  = desc || (info && info.desc) || "Amazing destination";
    if(priceEl) priceEl.innerText = price ? "₹" + parseInt(price).toLocaleString('en-IN') + " per person" : "";
    if(heroEl && info)  heroEl.style.background = info.bg;
    if(iconEl && info)  iconEl.innerText = info.icon;

    // Set min date for travel to tomorrow
    let dateInput = document.getElementById("date");
    if(dateInput){
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split("T")[0];
    }
  }

  // ---- BOOKINGS PAGE ----
  let bookingsContainer = document.getElementById("bookings");
  if(bookingsContainer && window.location.href.includes("mybookings")){
    loadBookings();
  }

  // ---- WISHLIST PAGE ----
  let wishlistContainer = document.getElementById("wishlist");
  if(wishlistContainer && window.location.href.includes("wishlist")){
    loadWishlist();
  }
};


// ============================================================
//  LOAD BOOKINGS
// ============================================================
function loadBookings(){
  let container = document.getElementById("bookings");
  if(!container) return;

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if(bookings.length === 0){
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:60px;">🧳</div>
        <h3>No Bookings Yet</h3>
        <p>Start exploring and book your dream trip!</p>
        <a href="index.html" class="explore-btn">Explore Destinations</a>
      </div>`;
    return;
  }

  container.innerHTML = "";

  bookings.forEach((b, index) => {
    let info = placeData[b.place] || { icon:"🌍", bg:"linear-gradient(135deg,#667eea,#764ba2)" };
    let statusClass = getBookingStatus(b.date);
    container.innerHTML += `
    <div class="booking-card">
      <div class="booking-img" style="background:${info.bg}">
        <span style="font-size:40px;">${info.icon}</span>
      </div>
      <div class="booking-details">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <h3>${b.place}</h3>
          <span class="status-badge ${statusClass.cls}">${statusClass.label}</span>
        </div>
        <p>👤 ${b.name}</p>
        <p>📧 ${b.email || 'N/A'}</p>
        <p>📅 ${formatDate(b.date)} &nbsp;•&nbsp; 👥 ${b.persons} person(s)</p>
        <p>🛏️ ${b.roomType || 'Standard Room'} &nbsp;•&nbsp; ${b.rooms || 1} room(s)</p>
        <p style="color:#ff5722;font-weight:600;font-size:18px;">₹${parseInt(b.price).toLocaleString('en-IN')}</p>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="remove-btn" onclick="deleteBooking(${index})">❌ Cancel Booking</button>
        </div>
      </div>
    </div>`;
  });
}

function getBookingStatus(dateStr){
  if(!dateStr) return { cls:"status-upcoming", label:"Upcoming" };
  let tripDate = new Date(dateStr);
  let today = new Date();
  today.setHours(0,0,0,0);
  if(tripDate < today) return { cls:"status-completed", label:"Completed" };
  return { cls:"status-upcoming", label:"Upcoming" };
}

function formatDate(dateStr){
  if(!dateStr) return "N/A";
  let d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}


// ============================================================
//  LOAD WISHLIST
// ============================================================
function loadWishlist(){
  let container = document.getElementById("wishlist");
  if(!container) return;

  let list = JSON.parse(localStorage.getItem("wishlist")) || [];

  if(list.length === 0){
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:60px;">💔</div>
        <h3>Your Wishlist is Empty</h3>
        <p>Browse destinations and save your favorites!</p>
        <a href="index.html" class="explore-btn">Explore Destinations</a>
      </div>`;
    return;
  }

  container.innerHTML = "";

  list.forEach((item, index) => {
    let info = placeData[item.place] || { icon:"🌍", bg:"linear-gradient(135deg,#667eea,#764ba2)", desc:"Amazing destination" };
    container.innerHTML += `
    <div class="booking-card">
      <div class="booking-img" style="background:${info.bg}">
        <span style="font-size:40px;">${info.icon}</span>
      </div>
      <div class="booking-details">
        <h3>${item.place}</h3>
        <p>${info.desc}</p>
        <p style="color:#ff5722;font-weight:600;margin:5px 0;">₹${parseInt(item.price).toLocaleString('en-IN')} per person</p>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button class="book-now-btn" onclick="bookFromWishlist('${item.place}', ${item.price})">✈️ Book Now</button>
          <button class="remove-btn" onclick="removeWishlist(${index})">🗑️ Remove</button>
        </div>
      </div>
    </div>`;
  });
}


// ============================================================
//  SAVE BOOKING (form submit)
// ============================================================
function saveData(event){
  event.preventDefault();

  let age = parseInt(document.getElementById("age").value);
  if(age < 18){
    showAlert("Age must be 18+ ❌", "error");
    return;
  }

  let phone = document.getElementById("phone").value;
  if(phone.length !== 10){
    showAlert("Enter valid 10-digit phone number ❌", "error");
    return;
  }

  let price    = parseInt(localStorage.getItem("selectedPrice") || 0);
  let persons  = parseInt(document.getElementById("persons").value || 1);
  let total    = price * persons;

  document.getElementById("payAmount").innerText = `Total: ₹${total.toLocaleString('en-IN')}`;
  document.getElementById("payment").style.display = "flex";
}


// ============================================================
//  CONFIRM PAYMENT
// ============================================================
function confirmPayment(){
  let cardNum  = document.getElementById("cardNum")?.value.replace(/\s/g,"") || "";
  let expiry   = document.getElementById("expiry")?.value || "";
  let cvv      = document.getElementById("cvv")?.value || "";
  let cardName = document.getElementById("cardName")?.value || "";

  if(cardNum.length < 16){ showAlert("Enter valid 16-digit card number ❌", "error"); return; }
  if(expiry.length < 5)  { showAlert("Enter valid expiry MM/YY ❌", "error"); return; }
  if(cvv.length < 3)     { showAlert("Enter valid CVV ❌", "error"); return; }
  if(!cardName.trim())   { showAlert("Enter name on card ❌", "error"); return; }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let price    = parseInt(localStorage.getItem("selectedPrice") || 0);
  let persons  = parseInt(document.getElementById("persons").value || 1);

  let booking = {
    place:    localStorage.getItem("selectedPlace"),
    price:    price * persons,
    name:     document.getElementById("name").value,
    email:    document.getElementById("email").value,
    phone:    document.getElementById("phone").value,
    date:     document.getElementById("date").value,
    persons:  persons,
    roomType: document.getElementById("roomType").value,
    rooms:    document.getElementById("rooms").value,
    travelType: document.getElementById("travelType").value,
    bookedOn: new Date().toISOString()
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  document.getElementById("payment").style.display = "none";
  showAlert("🎉 Payment Successful! Booking Confirmed!", "success");

  setTimeout(() => { window.location.href = "mybookings.html"; }, 2000);
}


// ============================================================
//  DELETE BOOKING
// ============================================================
function deleteBooking(index){
  if(!confirm("Are you sure you want to cancel this booking?")) return;
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
}


// ============================================================
//  WISHLIST - ADD
// ============================================================
function addWishlist(){
  let list  = JSON.parse(localStorage.getItem("wishlist")) || [];
  let place = localStorage.getItem("selectedPlace");
  let price = localStorage.getItem("selectedPrice");

  if(!place){
    showAlert("No place selected ❌", "error");
    return;
  }

  let exists = list.find(item => item.place === place);
  if(!exists){
    list.push({ place, price: parseInt(price) });
    localStorage.setItem("wishlist", JSON.stringify(list));
    showAlert("❤️ Added to Wishlist!", "success");
  } else {
    showAlert("⚠️ Already in your Wishlist!", "info");
  }
}


// ============================================================
//  WISHLIST - REMOVE
// ============================================================
function removeWishlist(index){
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];
  list.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(list));
  loadWishlist();
}


// ============================================================
//  BOOK FROM WISHLIST
// ============================================================
function bookFromWishlist(place, price){
  let info = placeData[place] || {};
  openPlace(place, price, info.desc, info.type || "city");
}


// ============================================================
//  TRAVEL PLANNER
// ============================================================
function generatePlan(){
  let budget     = parseInt(document.getElementById("budget")?.value);
  let days       = parseInt(document.getElementById("days")?.value);
  let tripType   = document.getElementById("tripType")?.value || "";
  let preference = document.getElementById("preference")?.value || "";

  if(!budget || !days){
    showAlert("Please enter budget & number of days ❌", "error");
    return;
  }

  if(days < 1 || days > 30){
    showAlert("Please enter days between 1 and 30 ❌", "error");
    return;
  }

  // Smart suggestion logic
  let suggestions = [];
  let tips = [];

  // Based on budget
  if(budget >= 80000){
    if(preference === "beach")     suggestions.push("🏝️ Maldives", "🌅 Santorini");
    else if(preference === "mountains") suggestions.push("🏔️ Switzerland", "⛩️ Japan");
    else if(preference === "city") suggestions.push("🗽 New York", "🎡 London", "⛩️ Japan");
    else suggestions.push("🏔️ Switzerland", "🌅 Santorini", "🗽 New York");
  } else if(budget >= 50000){
    if(preference === "beach")     suggestions.push("🏝️ Maldives", "🌴 Thailand");
    else if(preference === "mountains") suggestions.push("🏔️ Switzerland");
    else if(preference === "city") suggestions.push("🗼 Paris", "🏛️ Italy", "🎡 London");
    else suggestions.push("🗼 Paris", "🕌 Turkey", "🏛️ Italy");
  } else if(budget >= 30000){
    if(preference === "beach")     suggestions.push("🌴 Thailand", "🌊 Goa", "🌺 Bali");
    else if(preference === "mountains") suggestions.push("🏔️ Manali", "🏡 Shimla");
    else if(preference === "city") suggestions.push("🏙️ Dubai");
    else suggestions.push("🌴 Thailand", "🌺 Bali", "🏙️ Dubai");
  } else {
    suggestions.push("🏡 Shimla", "🏔️ Manali", "🌊 Goa");
  }

  // Based on trip type
  if(tripType === "couple")  tips.push("💑 Perfect for couples: Maldives, Santorini & Paris offer the most romantic experiences.");
  if(tripType === "family")  tips.push("👨‍👩‍👧‍👦 Family tip: Choose destinations with kid-friendly activities & direct flights.");
  if(tripType === "solo")    tips.push("🎒 Solo tip: Thailand, Bali & Turkey have great solo travel communities & hostels.");
  if(tripType === "friends") tips.push("🎉 Group tip: Book early & split hotel costs to stretch your budget further!");

  // Days-based advice
  let dayTip = "";
  if(days <= 3)       dayTip = "⏱️ Short trip: Stick to 1 city to avoid exhausting travel time.";
  else if(days <= 7)  dayTip = "📅 Great duration for an immersive experience in 1-2 destinations.";
  else if(days <= 14) dayTip = "🗺️ Ideal for a multi-city tour — consider a Europe or Southeast Asia circuit.";
  else                dayTip = "🌍 Long trip! Consider a multi-country journey or slow travel in one region.";

  let perDayBudget = Math.round(budget / days);

  let resultHTML = `
    <div class="plan-card">
      <h4>🎯 Recommended Destinations</h4>
      <div class="plan-suggestions">${suggestions.map(s => `<span class="plan-tag">${s}</span>`).join("")}</div>
      
      <div class="plan-stats">
        <div class="plan-stat">
          <span class="stat-icon">💰</span>
          <span class="stat-label">Total Budget</span>
          <span class="stat-val">₹${budget.toLocaleString('en-IN')}</span>
        </div>
        <div class="plan-stat">
          <span class="stat-icon">📅</span>
          <span class="stat-label">Duration</span>
          <span class="stat-val">${days} Days</span>
        </div>
        <div class="plan-stat">
          <span class="stat-icon">📊</span>
          <span class="stat-label">Per Day</span>
          <span class="stat-val">₹${perDayBudget.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="plan-tips">
        <p>${dayTip}</p>
        ${tips.map(t => `<p>${t}</p>`).join("")}
        <p>✅ <strong>Pro tip:</strong> Book flights 6-8 weeks early for best prices!</p>
      </div>
    </div>
  `;

  let resultEl = document.getElementById("planResult");
  resultEl.innerHTML = resultHTML;
  resultEl.style.display = "block";
  resultEl.scrollIntoView({ behavior:"smooth", block:"nearest" });
}


// ============================================================
//  CHATBOT
// ============================================================
function toggleChat(){
  let chat = document.getElementById("chatbox");
  if(chat) chat.classList.toggle("hidden");
}

// Responses database
const botRules = [
  { keywords:["hello","hi","hey","namaste"],    reply:"👋 Hello! Welcome to TravelX. I'm here to help you plan your perfect trip! What destination are you dreaming of?" },
  { keywords:["budget","cheap","affordable","low cost"], reply:"💰 On a tight budget? Here are great picks:\n• 🏡 Shimla — ₹20K (4 days)\n• 🏔️ Manali — ₹25K (5 days)\n• 🌊 Goa — ₹30K (4 days)\n• 🌴 Thailand — ₹35K (5 days)" },
  { keywords:["luxury","expensive","premium","high end"], reply:"✨ For a luxury experience:\n• 🏝️ Maldives — ₹70K (6 days)\n• 🌅 Santorini — ₹85K (6 days)\n• 🏔️ Switzerland — ₹90K (7 days)\n• 🗽 New York — ₹75K (7 days)" },
  { keywords:["honeymoon","couple","romantic","love"],    reply:"💑 Romantic destinations:\n• 🏝️ Maldives — Overwater bungalows\n• 🌅 Santorini — Stunning sunsets\n• 🗼 Paris — City of Love\n• 🌺 Bali — Spiritual & serene" },
  { keywords:["family","kids","children"],               reply:"👨‍👩‍👧‍👦 Family-friendly destinations:\n• 🏙️ Dubai — Theme parks & activities\n• 🌴 Thailand — Elephant parks & beaches\n• 🌊 Goa — Calm beaches & water sports\n• ⛩️ Japan — Safe & kid-friendly" },
  { keywords:["solo","alone","backpack"],                reply:"🎒 Best for solo travelers:\n• 🌴 Thailand — Great backpacker trails\n• 🌺 Bali — Spiritual & social hostels\n• 🕌 Turkey — Budget-friendly & cultural\n• 🏡 Shimla — Safe & scenic" },
  { keywords:["beach","sand","sea","ocean","water"],     reply:"🏖️ Best beach destinations:\n• 🏝️ Maldives — World's best beaches\n• 🌊 Goa — Party & chill beaches\n• 🌴 Thailand — Phi Phi, Phuket & Krabi\n• 🌅 Santorini — Volcanic black sand beaches" },
  { keywords:["mountain","hills","trek","snow","cold"],  reply:"⛰️ Best mountain destinations:\n• 🏔️ Switzerland — Swiss Alps\n• 🏔️ Manali — Himalayan adventure\n• 🏡 Shimla — Queen of Hills\n• ⛩️ Japan — Mount Fuji & alpine villages" },
  { keywords:["visa","passport","document"],             reply:"📄 Visa tips:\n• 🇦🇪 Dubai — Visa on arrival for Indians\n• 🇹🇭 Thailand — Visa on arrival (30 days)\n• 🇧🇦 Bali — Visa on arrival\n• 🇯🇵 Japan — Pre-apply visa required\nTip: Apply 4-6 weeks before travel!" },
  { keywords:["book","booking","reserve","confirm"],     reply:"✈️ To book a trip:\n1. Go to Home page\n2. Click on any destination card\n3. Fill in your details\n4. Complete secure payment\n\nYour bookings are saved in 'My Bookings'!" },
  { keywords:["wishlist","save","favorite","heart"],     reply:"❤️ To add to Wishlist:\n1. Click on any destination card\n2. On the booking page, click '❤️ Add to Wishlist'\n3. View all saved places in 'Wishlist' section!" },
  { keywords:["cancel","refund","delete"],               reply:"❌ To cancel a booking:\n1. Go to 'My Bookings'\n2. Find your booking\n3. Click '❌ Cancel Booking'\n\nNote: Cancellation policy varies by destination." },
  { keywords:["paris","france","eiffel"],                reply:"🗼 Paris, France\n💰 ₹50,000 • 5 Days\n🌟 Rating: ⭐⭐⭐⭐\n\nHighlights: Eiffel Tower, Louvre Museum, Seine River cruise, world-class cuisine & fashion." },
  { keywords:["dubai","uae","burj"],                     reply:"🏙️ Dubai, UAE\n💰 ₹40,000 • 4 Days\n🌟 Rating: ⭐⭐⭐⭐⭐\n\nHighlights: Burj Khalifa, Desert Safari, Dubai Mall, indoor skiing & luxury shopping." },
  { keywords:["maldives","island","resort"],             reply:"🏝️ Maldives\n💰 ₹70,000 • 6 Days\n🌟 Rating: ⭐⭐⭐⭐⭐\n\nHighlights: Overwater bungalows, snorkeling, crystal waters, coral reefs & luxury resorts." },
  { keywords:["japan","tokyo","osaka","kyoto"],          reply:"⛩️ Japan\n💰 ₹80,000 • 7 Days\n🌟 Rating: ⭐⭐⭐⭐⭐\n\nHighlights: Mount Fuji, temples, cherry blossoms, bullet trains, ramen & anime culture." },
  { keywords:["goa","india","beach party"],              reply:"🌊 Goa, India\n💰 ₹30,000 • 4 Days\n🌟 Rating: ⭐⭐⭐⭐\n\nHighlights: North & South beaches, water sports, seafood, nightlife & Portuguese heritage." },
  { keywords:["weather","season","best time","when"],    reply:"🌤️ Best travel seasons:\n• 🌺 Bali/Thailand — Nov–Apr (dry season)\n• ⛩️ Japan — Mar–May (cherry blossoms)\n• 🏔️ Manali/Shimla — Oct–Feb (snow)\n• 🌊 Goa — Nov–Feb (perfect weather)\n• 🏙️ Dubai — Nov–Mar (cool & pleasant)" },
  { keywords:["payment","card","pay","price"],           reply:"💳 Payment info:\n• We accept all major credit/debit cards\n• Payments are 100% secure & encrypted\n• Price shown is per person\n• Final amount calculated at checkout" },
  { keywords:["contact","help","support","number"],      reply:"📞 TravelX Support:\n• Phone: +91 7845634598\n• Email: support@travelx.com\n• Hours: Mon–Sat, 9AM–8PM IST\n\nWe're happy to help you plan your trip! 😊" },
  { keywords:["thank","thanks","great","awesome","good"],reply:"😊 You're welcome! Happy travels! ✈️ Feel free to ask anything about destinations, bookings, or travel tips!" },
];

function sendMsg(){
  let input = document.getElementById("chatInput");
  let body  = document.getElementById("chatBody");
  if(!input || !body || !input.value.trim()) return;

  let userMsg = input.value.trim();

  // User bubble
  body.innerHTML += `
    <div class="user-msg">${userMsg}</div>`;

  let msg   = userMsg.toLowerCase();
  let reply = null;

  // Match keywords
  for(let rule of botRules){
    if(rule.keywords.some(k => msg.includes(k))){
      reply = rule.reply;
      break;
    }
  }

  // Default fallback
  if(!reply){
    let fallbacks = [
      "🤔 I'm not sure about that! Try asking about destinations, budget, visa, or booking steps.",
      "✈️ Great question! Could you ask about a specific destination or travel type?",
      "💡 Tip: You can ask me about beaches, mountains, budget travel, luxury trips, or honeymoon ideas!",
      "🗺️ I can help with destination recommendations, visa info, booking help & travel tips!"
    ];
    reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Typing animation
  body.innerHTML += `<div class="bot-msg typing-indicator" id="typing">⏳ Typing...</div>`;
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    let typingEl = document.getElementById("typing");
    if(typingEl) typingEl.remove();
    body.innerHTML += `<div class="bot-msg">${reply.replace(/\n/g, '<br>')}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 600);

  input.value = "";
}


// ============================================================
//  CARD FORMATTING
// ============================================================
function formatCard(input){
  let v = input.value.replace(/\D/g, "").substring(0,16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(input){
  let v = input.value.replace(/\D/g, "").substring(0,4);
  if(v.length >= 2) v = v.substring(0,2) + "/" + v.substring(2);
  input.value = v;
}


// ============================================================
//  CUSTOM ALERT
// ============================================================
function showAlert(message, type){
  let existing = document.getElementById("customAlert");
  if(existing) existing.remove();

  let el = document.createElement("div");
  el.id = "customAlert";
  el.className = `custom-alert alert-${type}`;
  el.innerHTML = message;
  document.body.appendChild(el);

  setTimeout(() => el.classList.add("show"), 10);
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 3000);
}
