// TransactionList bileşeninin içinde
function TransactionList() {
    return (
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        {/* Tablo içeriği */}
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {/* Transaction itemleri burada gelecek */}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TransactionList;