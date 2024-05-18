import fs from 'fs'

export async function readCsv(path) {
  return new Promise((res,rej)=>{
  // defining data array that will be returned after the operation is perfomed
  const datas = [];
  const fields = [];
  //raeding files asynchronous
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) rej(err);

    //spliting dataLine wise
    data.split("\n").forEach((line, i) => {
      // triming extra spaces
      line = line.trim();
      //getting parameters
      if (i == 0) {
        const params = line.split(",");
        params.map((param) => {
          fields.push(param);
        });
      }
      //setting values to datas array
      if (i != 0) {
        const values = line.split(",");
        const newUser = {};
        values.map((value, idx) => {
          newUser[fields[idx]] = value;
        });
        datas.push(newUser);
      }
    });
    res(datas);
  });
  })
}