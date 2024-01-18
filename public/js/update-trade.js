async function updateTrade(id, user_id) {
    const trade = await fetch(`api/trades/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    
    await fetch(`api/trades/${id}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                requestedByUserId: user_id,
                status: 'completed',
            }
        ),
        headers: { 'Content-Type': 'application/json' },
    })

    let tradeBtnEl = document.getElementById('trade-btn');
    tradeBtnEl.textContent = 'TRADE ACCEPTED!';
    tradeBtnEl.setAttribute('onclick', '')

    document.location.replace('/offers');
    alert("Remember to reach out on Steam to complete your trade!");
}