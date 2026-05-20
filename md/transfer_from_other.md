← Go back to 
[Inventories Module Documentation](/Inventories)


# transfer_from_other.aspx

## Overview

**File**: `\Inventories\Process\transfer_from_other.aspx`
**Purpose**: Transfer from other page for transferring inventory items between stores based on dispense requests
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Warehouse staff, inventory administrators, transfer personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Request Selection (Required for Loading Items)**
- **Request Dropdown**: Must select valid request for loading items
- **Error Prevention**: System validates request is selected before loading items
- **Data Source**: Inventories_Dispense_Request_Header table with request information
- **Default Behavior**: User must select request manually
- **Error Message**: Validation prevents item loading without request selection
- **Validation**: Only active requests with Done <> 0 are available

#### 2. **Item Selection (Required for Transfer)**
- **Item Grid Selection**: Must select valid item from request items
- **Error Prevention**: System validates item is selected before transfer
- **Data Source**: Inventories_Stock table with item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents transfer without item selection
- **Validation**: Only items with available quantity are available

#### 3. **Transfer Quantity Input (Required for Transfer)**
- **Transfer Quantity Field**: Must enter valid transfer quantity for item
- **Error Prevention**: System validates transfer quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter transfer quantity manually
- **Error Message**: Validation prevents transfer with zero or negative transfer quantity
- **Validation**: Transfer quantity must be positive number

#### 4. **Confirmation Action (Required for Confirmation)**
- **Confirm Button**: Must click confirm button to confirm transfer
- **Error Prevention**: System validates confirmation action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click confirm button manually
- **Error Message**: Validation prevents confirmation without user action
- **Validation**: Confirmation action must be explicitly selected

### Common Error Scenarios and Prevention

#### **Request Selection Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading items
- **Error**: Request has no items pending transfer
- **Prevention**: Verify request has items pending transfer

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before transfer
- **Error**: Item has no available quantity
- **Prevention**: Verify item has available quantity before selection

#### **Transfer Quantity Errors**
- **Error**: No transfer quantity entered
- **Prevention**: Always enter transfer quantity before transfer
- **Error**: Zero or negative transfer quantity
- **Prevention**: Always enter positive transfer quantity values

#### **Confirmation Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure transfer is selected before confirmation
- **Error**: Items not reviewed
- **Prevention**: Review all items before confirmation

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have transfer permissions** via employee group assignments
3. **Requests must be pending transfer** in the system
4. **Items must be available** for transfer

#### **Required System State**
- User authentication must be active
- Transfer permissions must be configured
- Request data must be current
- Item data must be available

### Success Criteria

#### **For Request Selection**
- ✅ Request dropdown populated with pending transfer requests only
- ✅ Request validation ensures proper item loading
- ✅ Request selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected request
- ✅ Item details show complete transfer information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Transfer Management**
- ✅ Transfer creates proper transfer records
- ✅ Item selection enables transfer workflow
- ✅ Transfer workflow works with proper validation
- ✅ Transfer completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for transfer from other

### Request Selection Section

```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="طلب التعزيز" ColSpanMd="6" CssClasses-Caption="cc" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Requt" DataSourceID="RequestDS" AutoPostBack="true" TextField="OrderNo" ValueField="id" OnSelectedIndexChanged="Requt_SelectedIndexChanged"></dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Information Section

```html
<!-- Store Information -->
<dx:BootstrapLayoutItem Caption="المخزن المرسل" ColSpanMd="6" CssClasses-Caption="cc" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="txtstorage1" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المخزن المستلم" ColSpanMd="6" CssClasses-Caption="cc">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="txtstorage2" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="Key" DataSourceID="RequstItemsDS" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="RequesrItems_SelectionChanged">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Key" Caption="Code" Visible="false" ReadOnly="True"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم مستند التحويل"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الدفعه"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storeid" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="كود الصنف"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done" Caption="الرصيد"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="ItemUnit_storage_Id" Visible="false" Caption="تاريخ الصرف" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="batch_no" Visible="false" Caption="تاريخ الصرف" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف = {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف = {0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Transfer Section

```html
<!-- Transfer -->
<dx:BootstrapLayoutItem Caption="التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapSpinEdit runat="server" Width="100%" ID="Exchange_amount"></dx:BootstrapSpinEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="الرصيد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" Width="100%" Enabled="false" ID="Avaliable"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="وحدة التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="Unit" Width="100%" Enabled="false" AutoPostBack="true"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <div style="display: flex; align-content: center; justify-content: center;">
                <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn" Text="اضافة" OnClick="add_Click">
                    <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                    <CssClasses Icon="simple-icon-plus" />
                    <SettingsBootstrap RenderOption="Secondary" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Temporary Transfer Grid Section

```html
<!-- Temporary Transfer Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewTempDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="patch" Visible="false" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="transfer_unit" Caption="اسم الصنف" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="from_store" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="to_store" Visible="false"></dx:BootstrapGridViewDataColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="20%" Text="تحويل" OnClick="save_btn_Click">
                            <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                            <CssClasses Icon="simple-icon-basket-loaded" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Request Parameters**:
- `@Emp` - Employee code for filtering requests
- `@header` - Request header ID for filtering items

**Item Parameters**:
- `@emp` - Employee code for filtering temporary records
- `@date` - Date for filtering temporary records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Request Selection**: Loads items based on selected request
3. **Item Selection**: Loads item information for selected item
4. **Transfer Quantity Entry**: Enters transfer quantity for item
5. **Item Addition**: Adds item to temporary transfer grid
6. **Transfer Save**: Saves complete transfer records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads request information
3. Sets default transfer state
4. Initializes date displays

### Requet_SelectedIndexChanged Method

```csharp
protected void Requet_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected request

**Process**:
1. Validates request selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates request information display

### RequesrItems_SelectionChanged Method

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Loads item details
3. Updates item information display
4. Enables transfer workflow

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary transfer grid

**Process**:
1. Validates all required fields are filled
2. Validates transfer quantity is greater than 0
3. Checks item availability
4. Inserts item into temporary table
5. Refreshes temporary transfer grid
6. Clears form fields for next addition

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete transfer records

**Process**:
1. Validates at least one item is added
2. Generates new transfer document number
3. Inserts transfer header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Dispense request header information
- **Key Fields**: id, OrderNo, inv_from, inv_to, Active, OrderType, Done
- **Usage**: Tracks request information for transfer
- **Filtering**: Only active requests with Done <> 0

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Dispense request details with item information
- **Key Fields**: id, Header_FK, item_code, doc_id
- **Usage**: Tracks request items for transfer
- **Filtering**: Only items with remaining quantity

#### **Inventories_Stock**
- **Purpose**: Stock records with item information
- **Key Fields**: ID, Itemcode, storeid, batch_no, Quantity_Exchange, Amount_Done_Exchange, Quantity_storage, Amount_Done, MoveType, dispense_request, ItemUnit_storage_Id, doc_id
- **Usage**: Tracks stock items for transfer
- **Filtering**: Only items with MoveType='6'

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_item_type**
- **Purpose**: Item type master data
- **Key Fields**: id, arabic_name
- **Usage**: Provides item type information for display

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active
- **Usage**: Provides store information for display
- **Filtering**: Only active stores

#### **Inventories_General_Dispense_temp**
- **Purpose**: Temporary dispense records before save
- **Key Fields**: ID, store, patch, Quntitiy, item, transfer_unit, from_store, to_store, emp, date
- **Usage**: Tracks transfer items before save

#### **Inventories_rules_stores**
- **Purpose**: Store rules for employee access
- **Key Fields**: id, store_id, emp_id, active
- **Usage**: Provides store access for employees
- **Filtering**: Only active rules for employee

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing transfer data

#### **Request Filtering**
```sql
SELECT distinct F.id, OrderNo FROM Inventories_Dispense_Request_Header F 
inner join Inventories_Dispense_Request_Details on F.id = Header_FK 
inner join Inventories_rules_stores R on R.store_id = inv_from 
where F.Active = 1 and OrderType=9 and R.emp_id = @Emp and R.active=1 and Done <> 0
```

**Filtering Logic**: Shows only requests pending transfer
**Permission Logic**: Only requests pending transfer are available
**Validation**: Ensures request has items pending transfer

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to request dropdown

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("جارى التحميل...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Function

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Checkbox Logic**: Ensures only one checkbox is selected at a time
**User Experience**: Provides single selection behavior for grid
**Usage**: Applied to grid checkboxes for single selection

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup Handling Function

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Handles popup display and callback
**User Experience**: Provides detailed information display
**Usage**: Applied to grid for detailed information display

### Back Button Prevention Function

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Back Button Logic**: Prevents browser back button usage
**User Experience**: Ensures proper workflow navigation
**Usage**: Applied to page for workflow security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Request Selection Section**
```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="طلب التعزيز" ColSpanMd="6" CssClasses-Caption="cc" BeginRow="true">
```

#### **2. Store Information Section**
```html
<!-- Store Information -->
<dx:BootstrapLayoutItem Caption="المخزن المرسل" ColSpanMd="6" CssClasses-Caption="cc" BeginRow="true">
<dx:BootstrapLayoutItem Caption="المخزن المستلم" ColSpanMd="6" CssClasses-Caption="cc">
```

#### **3. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Transfer Section**
```html
<!-- Transfer -->
<dx:BootstrapLayoutItem Caption="التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="الرصيد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="وحدة التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
```

#### **5. Temporary Transfer Grid Section**
```html
<!-- Temporary Transfer Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Request Data Source
SqlDataSource RequestDS = new SqlDataSource();
RequestDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequestDS.SelectCommand = "SELECT distinct F.id, OrderNo FROM Inventories_Dispense_Request_Header F inner join Inventories_Dispense_Request_Details on F.id = Header_FK inner join Inventories_rules_stores R on R.store_id = inv_from where F.Active = 1 and OrderType=9 and R.emp_id = @Emp and R.active=1 and Done <> 0";

// Item Data Source
SqlDataSource RequstItemsDS = new SqlDataSource();
RequstItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequstItemsDS.SelectCommand = "SELECT storeid, st.doc_id, sum(Quantity_Exchange) - sum(Amount_Done_Exchange), sum(Quantity_storage) - sum(Amount_Done) as 'Done', st.ID, IIS.Item_Type_id, IIS.item_code, st.ID as 'Key', st.batch_no, IIS.arabic_name, ISett.arabic_name Discription, IIS.item_code, IIS.item_code, ItemUnit_storage_Id from Inventories_Stock st inner join Inventories_Item_Settings IIS on IIS.item_code = st.Itemcode inner join Inventories_item_type ISett on ISett.id = IIS.Item_Type_id WHERE st.MoveType='6' and storeid=4 and dispense_request = @header group by st.ID, st.batch_no, IIS.Item_Type_id, IIS.arabic_name, ISett.arabic_name, IIS.item_code, IIS.item_code, st.doc_id, storeid, ItemUnit_storage_Id order by ISett.arabic_name";

// Temporary Transfer Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_temp.ID, store, patch, Quntitiy, transfer_unit, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', from_store, to_store, 'Waiting' as status FROM Inventories_General_Dispense_temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where emp = @emp and date = @date";
```

## Business Logic and Validation

### Request Selection Validation

```csharp
protected void Requet_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Requt.Value == "" || Requet.Value == null)
    {
        // Clear item grid
        RequesrItems.DataSource = null;
        RequesrItems.DataBind();
        return;
    }
    // ... additional validation
}
```

**Request Logic**: Validates request selection before loading items
**Error Prevention**: Prevents item loading without request selection

### Item Selection Validation

```csharp
protected void RequesrItems_SelectionChanged(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        // Clear item information
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading item information
**Error Prevention**: Prevents item information loading without item selection

### Transfer Quantity Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Convert.ToDecimal(Exchange_amount.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    // ... additional validation
}
```

**Transfer Quantity Logic**: Validates transfer quantity is positive and within limits
**Error Prevention**: Prevents transfer with invalid transfer quantity

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Request Selection Validation**: Must select request before loading items
- **Item Selection Validation**: Must select item before loading item information
- **Transfer Quantity Validation**: Must enter transfer quantity before transfer

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Request Validation**: Ensures request is pending transfer
- **Item Validation**: Ensures item has available quantity
- **Transfer Quantity Validation**: Ensures transfer quantity is positive and within limits

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Request Access**: Ensures user has access to selected request
- **Transfer Access**: Ensures user can access and modify transfer records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Transfer Success**: "تم التحويل" (Transfer completed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Transfer From Other Management System**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Dispense request header information
  - `Inventories_Dispense_Request_Details` - Dispense request item details
  - `Inventories_Stock` - Stock records with item information
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_item_type` - Item type master data
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_General_Dispense_temp` - Temporary dispense records
  - `Inventories_rules_stores` - Store rules for employee access
- **Integration Details**:
  - Request selection controls item display
  - Item selection controls transfer
  - Transfer tracked with complete information
- **Data Flow**:
  - Requests filtered for user access
  - Items filtered by request
  - Transfer tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all transfer operations
  - Request access controlled by user permissions

### Data Exchange

#### **Request and Item Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Dispense request header information
  - `Inventories_Dispense_Request_Details` - Dispense request item details
- **Real-time Data**:
  - Request information for transfer
  - Item information for transfer
- **Data Relationships**:
  - Requests linked to items via Header_FK
  - Items linked to transfer via item_code
  - Transfer tracked by user

#### **Item and Transfer Information**
- **Database Tables**:
  - `Inventories_Stock` - Stock records with item information
  - `Inventories_General_Dispense_temp` - Temporary dispense records
- **Real-time Data**:
  - Item details and descriptions
  - Transfer quantities and batches
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to transfer via item_code
  - Transfer tracked by request
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار طلب التعزيز" Error**
- **Cause**: Request not selected before loading items
- **Solution**: Always select request before loading items
- **Prevention**: Request selection is required for all transfer operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before transfer
- **Solution**: Always select item before transfer
- **Prevention**: Item selection is required for all transfer operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Transfer quantity not entered before transfer
- **Solution**: Always enter transfer quantity before transfer
- **Prevention**: Transfer quantity entry is required for all transfer operations

#### **No Requests Found**
- **Cause**: No requests pending transfer
- **Solution**: Verify requests are pending transfer
- **Prevention**: Ensure requests are pending transfer

#### **Transfer Failed Error**
- **Cause**: Transfer cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before transfer

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Transfer Access**: Access to transfer operations
- **Request Access**: Access to requests with transfer items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Transfer Workflow**: Understanding of transfer process
- **Request Management**: Knowledge of request selection and transfer
- **Transfer Management**: Knowledge of transfer creation and management

## Usage Examples

### Basic Transfer Workflow

1. **Page Load**: Verify page loads with default data
2. **Request Selection**: Select request for item loading
3. **Item Selection**: Select item from request items grid
4. **Transfer Quantity Entry**: Enter transfer quantity
5. **Item Addition**: Add item to temporary transfer grid
6. **Repeat Items**: Add additional items as needed
7. **Transfer Save**: Save complete transfer records

### Multi-Item Transfer Management

1. **Request Selection**: Select request for transfer
2. **Multiple Item Selection**: Select multiple items for transfer
3. **Transfer Quantity Entry**: Enter transfer quantity for each item
4. **Item Addition**: Add all items to temporary transfer grid
5. **Transfer Save**: Save complete transfer with all items
6. **Transfer Verification**: Verify transfer is saved correctly