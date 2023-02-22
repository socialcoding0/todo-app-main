const taskInput = document.querySelector("#task-i");
const addBtn = document.querySelector("#add");
const threeC = document.querySelector("#three-c");
const outputLng = document.querySelector("#text-l");
const deleteallBtn = document.querySelector("#delete-all");
const options = document.querySelector(".options");
const allC = document.querySelector("#all-c");
const activeC = document.querySelector("#active-c");
const completedC = document.querySelector("#completed-c");
const icons = document.querySelector("#icons");
let arr = [];

// console.log(icons);

icons.addEventListener("click", function () {
    if (document.querySelector("body").classList == "light-theme") {
        // console.log(document.querySelector("body"));
        document.querySelector("body").classList = "dark-theme";
    }
    else {
        document.querySelector("body").classList = "light-theme";
    }

});

addBtn.addEventListener("click", function () {
    if (!taskInput.value == "") {
        addTask(taskInput.value);
        deleteTask();
        OkOrNot();

        // console.log(arr);
        // console.log(arr.length + " arr length");
        // console.log(threeC.childElementCount + " three child");
        taskLength(threeC.childElementCount - arr.length);

        // over - scroll
        overScroll();
        optnsControl();

    }
});

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        document.querySelector("#add").click();
    }

});



// delete all

deleteallBtn.addEventListener("click", function () {
    threeC.innerHTML = "";
    arr = [];
    // console.log(arr);
    // console.log(arr.length + " arr length");
    // console.log(threeC.childElementCount + " three child");
    taskLength(threeC.childElementCount);

})



function addTask(taskValue) {

    let html = `
    
            <div class="output-d all active">
          <div id="btn-div">
            <button class="btn-ok"></button>
          </div>

          <p class="output-i"> ${taskValue} </p>
          <div id="delete" class="delete">
            <svg xmlns="http://www.w3.org/2000/svg"  class="delete-btn"  width="18" height="18">
              <path fill="#494C6B" fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
          </div>
        </div>
    `;

    threeC.insertAdjacentHTML("beforeend", html);

    taskInput.value = "";

}




function deleteTask() {
    let deleteX;
    for (let task of document.querySelectorAll(".output-d")) {
        deleteX = task;
    }

    deleteX.addEventListener("click", function (e) {

        if (e.target.id == "delete") {
            let output = e.target.parentElement;
            output.remove();
            overScroll();

            if (deleteX.classList == "output-d completed") {
                arr.length--;
                // console.log(arr);
                // console.log(arr.length + " arr length");
                // console.log(threeC.childElementCount + " three child");
                taskLength(threeC.childElementCount - arr.length);
            }
            else {

                // console.log(arr);
                // console.log(arr.length + " arr length");
                // console.log(threeC.childElementCount + " three child");
                taskLength(threeC.childElementCount - arr.length);
            }



        };

    });


}



function OkOrNot() {
    let ok;
    let p;
    let btnChild;
    let newCount;

    for (let task of document.querySelectorAll(".output-d")) {
        ok = task;
    }

    ok.addEventListener("click", function (e) {

        if (e.target.id == "btn-div") {


            // change-back

            btnChild = e.target.children[0];
            btnChild.classList.toggle("check-icon");





            if (btnChild.classList == "btn-ok check-icon") {

                ok.classList.remove("all");
                ok.classList.remove("active");
                ok.classList.add("completed");

                btnChild.style.width = "100%";
                btnChild.style.height = "100%";





            }
            else {
                ok.classList.add("all");
                ok.classList.add("active");
                ok.classList.remove("completed");

                btnChild.style.width = "90%";
                btnChild.style.height = "90%";
            }





            // line 

            p = e.target.nextElementSibling;
            p.classList.toggle("ok-effect");


            for (let optn of options.children) {
                if ((optn.classList == "optn-btn active" && optn.id == "active") && ok.classList == "output-d completed") {
                    // console.log(optn);
                    // console.log(ok);
                    ok.style.display = "none";
                }

                if ((optn.classList == "optn-btn active" && optn.id == "completed") && ok.classList == "output-d all active") {
                    // console.log(optn);
                    ok.style.display = "none";
                    // console.log(ok);
                }
            }




            if (ok.classList == "output-d completed") {
                arr.push(ok);

                // console.log(arr);
                // console.log(arr.length + " arr length");
                // console.log(threeC.childElementCount + " three child");
                taskLength(threeC.childElementCount - arr.length);

            }
            else {
                arr.length--;

                // console.log(arr);
                // console.log(arr.length + " arr length");
                // console.log(threeC.childElementCount + " three child");
                taskLength(threeC.childElementCount - arr.length);

            }










        }


    });





}



function taskLength(newCount) {

    // console.log("------------NEWCOUNT-----");
    // console.log(arr);
    // console.log(arr.length + " arr length");
    // console.log(threeC.childElementCount + " three child");
    // console.log(newCount + " newCount");



    if (newCount > 0) {
        return outputLng.textContent = newCount + " items left";
    }




    outputLng.textContent = "0 items left";

}





function overScroll() {
    if (threeC.childElementCount > 6) {
        threeC.style.overflowY = "scroll";
    }
    else {
        threeC.style.overflowY = "visible";
    }
}




for (let optn of options.children) {
    optn.addEventListener("click", function (e) {
        document.querySelector(".optn-btn.active").classList.remove("active");
        optn.classList.add("active");
    });

}




function optnsControl() {

    for (let task of document.querySelectorAll(".output-d")) {



        document.querySelector("#all").addEventListener("click", function () {

            // if (task.classList.contains("active")) {
            //     activeC.appendChild(task);
            // }
            if (task.classList.contains("output-d")) {
                task.style.display = "flex";
            }
            else {
                task.style.display = "none";
            }

        });



        document.querySelector("#active").addEventListener("click", function () {

            // if (task.classList.contains("active")) {
            //     activeC.appendChild(task);
            // }

            if (task.classList == "output-d all active") {

                task.style.display = "flex";
            }
            else {
                task.style.display = "none";
            }


        });


        document.querySelector("#completed").addEventListener("click", function () {

            if (task.classList == "output-d completed") {

                task.style.display = "flex";
            }
            else {
                task.style.display = "none";
            }




        });








    }




}





