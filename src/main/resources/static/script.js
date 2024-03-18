'use strict';
// Fra W3schools: "Strict mode makes it easier to write "secure" JavaScript. Strict mode changes previously accepted "bad syntax" into real errors."

$('document').ready(() => {

    $('#orderform').submit(event => {
        event.preventDefault();
        addtoTickets();

    })

    $('#autofyll').click(autoFillInfo);
    $('#slettalt').click(deleteTicketsNew());
    refreshTicketTable();
})

async function addtoTickets() {
    // Lage billett-objekt med tilhørende verdier
    let ticket = {};
    ticket.film = $("#film  option:selected").text();
    ticket.amount = $("#antall").val();
    ticket.firstname = $("#fornavn").val();
    ticket.lastname = $("#etternavn").val();
    ticket.tel = $("#tlf").val();
    ticket.email = $("#epost").val();

    // Tømme skjema
    $("#orderform").trigger('reset');

    // Send billett til backend
    await $.post("/tickets/add", ticket);

    // Legg billett til array og lag tabell
    await refreshTicketTable();
}

async function deleteTicketsNew() {
    await $.post("/tickets/clear");
    await refreshTicketTable();
}

async function refreshTicketTable() {
    // Få billetter fra backend
    let tickets = await $.get("/tickets/list");

    // Tømme tabell-body
    const table = $('#liste');
    table.empty();

    // Sende billetter til tabell
    let ut = "<tr>" +
        "<th>Film</th><th>Antall</th><th>Navn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    // Så blir hver billett printet i en tabell gjennom en for-løkke
    for (let i of tickets) {
        ut += "<tr>";
        ut += "<td>" + i.film + "</td><td>" + i.amount + "</td><td>" + i.firstname + "</td><td>" + i.lastname + "</td><td>" + i.tel + "</td><td>" + i.email + "</td>";
        ut += "</tr>";
    }
    $("#liste").html(ut);
}

// Fyll ut info knapp, for å slippe å skrive inn hver eneste gang :) ----------------------------------------
async function autoFillInfo() {
    const fornavnArray = ["Per", "Kari", "Ola", "Conan", "Anne", "Berit"];
    const etternavnArray = ["Pettersen", "Knutsen", "Olsen", "The Barbarian", "Andersen", "Berntsen"];
    const epostArray = ["epost@epost.no", "email@gmail.com", "hotmail@hotmail.com", "chunkylover53@aol.com", "secret@email.com", "notreal@oslomet.no"];
    const randomFornavn = fornavnArray[Math.floor(Math.random() * fornavnArray.length)];
    const randomEtternavn = etternavnArray[Math.floor(Math.random() * etternavnArray.length)];
    const randomEpost = epostArray[Math.floor(Math.random() * epostArray.length)];
    $("#film").val(Math.floor(Math.random() * (6) + 1));
    $("#antall").val(Math.floor(Math.random() * (99) + 1));
    $("#fornavn").val(randomFornavn);
    $("#etternavn").val(randomEtternavn);
    $("#tlf").val(Math.floor(Math.random() * (99999999 - 90000000 + 1)) + 90000000);
    $("#epost").val(randomEpost);
}