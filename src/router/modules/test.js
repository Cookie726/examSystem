export default [{
    path: "test",
    name: "test",
    meta: {
        name: "卷题管理",
        icon: "test-manage"
    },
    redirect: {
        name: "testPaper"
    },
    component: resolve => require(["@/views/test"], resolve),
    children: [{
            path: "paper",
            name: "testPaper",
            component: resolve => require(["@/views/test/paper"], resolve),
            meta: {
                name: "试卷管理",
                icon: "paper"
            }
        },
        {
            path: "question",
            name: "testQuestion",
            component: resolve => require(["@/views/test/question"], resolve),
            meta: {
                name: "题库管理",
                icon: "question"
            }
        }
    ]
}]