const fs = require('fs');

// type PlaceHolder = {
//   key:string,
//   value:string,
// }

const replacePlaceholder = [
  {key:'${__WB_BASE_PATH}', value:process.env.NEXT_PUBLIC_BASE_PATH||''}
]

const input = process.argv[2];
const output = process.argv[3];

function replaceStringInFile({input_path, output_path}/*:{input_path:string, output_path:string}*/) {
  console.log("input_path",input_path);
  console.log("output_path",output_path);
  // Read the file contents
  fs.readFile(input_path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to read the file: ${err}`);
      return;
    }

    // Replace the string
    let updatedData = data;
    replacePlaceholder.forEach(item=>{
      console.log("replace:",item.key, ";with:",item.value);
      updatedData = updatedData.replaceAll(item.key, item.value);
    });


    // Write the updated contents back to the file
    fs.writeFile(output_path, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Failed to write the updated file: ${err}`);
        return;
      }
    });
  });
}

replaceStringInFile({input_path:input,output_path:output});