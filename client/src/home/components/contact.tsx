const Contact = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 my-6">
      <h1 className="text-2xl font-bold text-mygreen mb-4">Kontakt</h1>

      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <p>
            <strong>SK Dolany, z.s.</strong>
          </p>
          <p>id klubu: 5320031</p>
          <p>IČO: 13585100, Datová schránka: v8rabe2</p>
          <p>Adresa: Dolany 21, Opatovice nad Labem</p>
          <p>
            E-mail:{" "}
            <a
              href="mailto:skdolany.pce@gmail.com"
              className="text-mygreen underline"
            >
              skdolany.pce@gmail.com
            </a>
          </p>
          <p>Bankovní spojení: 120278839/0800</p>
        </div>

        <div className="md:mx-10"></div>

        <div>
          <p>
            <strong>Zdeněk Zeman</strong>
          </p>
          <p>Předseda klubu</p>
          <p>
            Telefon:{" "}
            <a href="tel:+420735193999" className="text-mygreen underline">
              +420 735 193 999
            </a>
          </p>

          <br />

          <p>
            <strong>Michal Kopeček</strong>
          </p>
          <p>Místopředseda klubu</p>
          <p>
            Telefon:{" "}
            <a href="tel:+420602560203" className="text-mygreen underline">
              +420 602 560 203
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
