
$("submit").click(function () {

    // Variable for file path to be uploaded
    // var faceFile = "~/images/test.jpg";
    var faceFile = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Judi_Dench_at_the_BAFTAs_2007.jpg/330px-Judi_Dench_at_the_BAFTAs_2007.jpg";
    // API Key:
    var apiKey = "fc3rHjH50Us_jhP1zC0V26KkykD96fib";
    // API Secret
    var apiSecret = "xq072ifDu6LeqQf3uOtY0oj6EkxJlGqf";
    // Attribute request
    // Can use none; gender; AGE; smiling; headpose; facequality; + more in API documentation
    var apiAttr = "age";
    // Build URL with key & attribute request
    var facePlusURL = "https://api-us.faceplusplus.com/facepp/v3/detect" + "?api_key=" + apiKey +
        "&api_secret=" + apiSecret + "&image_url=" + faceFile + "&return_attributes=" + apiAttr;

    console.log(facePlusURL);

    // Ajax call here -----------------------------------------------------------------------------------------
    $.ajax({
        url: facePlusURL,
        method: "POST"
    })
        .then(function (response) {
            var ageResponse = response.faces[0].attributes.age.value;
            console.log(ageResponse);
        });

})

// Modal junk goes here (React Shiz)
class MyVerticallyCenteredModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                    ac consectetur ac, vestibulum at eros.
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = { modalShow: false };
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });

        return (
            <ButtonToolbar>
                <Button
                variant="primary"
                onClick={() => this.setState({ modalShow: true })}
                >
                Launch vertically centered modal
                </Button>

                <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={modalClose}
                />
            </ButtonToolbar>
        );
    }
};

render(<App />);

// Firebase junk goes here
var config = {
    apiKey: "AIzaSyDwjy8NSU9Lrf25eDNOK7w1ATRuRHcMIbM",
    authDomain: "train-scheduler-assignme-c1fd7.firebaseapp.com",
    databaseURL: "https://train-scheduler-assignme-c1fd7.firebaseio.com",
    projectId: "train-scheduler-assignme-c1fd7",
    storageBucket: "",
    messagingSenderId: "931949793399"
};
firebase.initializeApp(config);

var database = firebase.database();

