← Go back to 
[Inventories Module Documentation](/Inventories)

# AdministrationDismissalRequestCustody.aspx

## Overview

**File**: `\Inventories\Process\AdministrationDismissalRequestCustody.aspx`
**Purpose**: Custody administration request system for inventory dispensing with employee-based item restrictions
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Department administrators, inventory managers responsible for custody item requests

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Employee Selection (Required for Request)**
- **Employee Dropdown**: Must select valid employee for custody request
- **Error Prevention**: System validates employee is selected before adding items
- **Data Source**: Users table with employee codes and names
- **Default Behavior**: User must select employee manually
- **Error Message**: Validation prevents item addition without employee selection
- **Validation**: Excludes system users ('0', '00')

#### 2. **Store Selection (Required for Item Selection)**
- **Store Dropdown**: Must select valid store for item availability
- **Error Prevention**: System validates store is selected before item selection
- **Data Source**: Inventories_wharehouse_store filtered by procedure stores and active status
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents item selection without store selection
- **Validation**: Only stores with procedure access (Setup_Procedure_FK=3) and active status

#### 3. **Item Selection (Required for Addition)**
- **Item Dropdown**: Must select valid item from store inventory with custody permissions
- **Error Prevention**: System validates item is selected before adding to request
- **Data Source**: Inventories_Item_Settings filtered by custody dispensing type (fk_disp_type=7)
- **Default Behavior**: User must select item manually after store selection
- **Error Message**: Validation prevents addition without item selection
- **Validation**: Only items with custody permissions and proper dispensing rules

#### 4. **Quantity Input (Required for Addition)**
- **Quantity Field**: Must enter valid quantity for item request
- **Error Prevention**: System validates quantity is greater than 0
- **Data Source**: User input with validation
- **Default Behavior**: User must enter quantity manually
- **Error Message**: Validation prevents addition with zero or negative quantity
- **Validation**: Quantity must be positive number

#### 5. **Period Selection (Required for Addition)**
- **Period Date**: Must select valid period date for item need duration
- **Error Prevention**: System validates period is selected before adding items
- **Data Source**: User input with date validation
- **Default Behavior**: User must select period manually
- **Error Message**: Validation prevents addition without period selection
- **Validation**: Period must be valid date

### Common Error Scenarios and Prevention

#### **Employee and Store Errors**
- **Error**: No employee selected
- **Prevention**: Always select employee before adding items
- **Error**: No store selected
- **Prevention**: Always select store before item selection
- **Error**: Employee has no custody permissions
- **Prevention**: Ensure employee has proper custody item access permissions

#### **Item Selection Errors**
- **Error**: No items available in store
- **Prevention**: Ensure store has items with available quantity
- **Error**: Item has insufficient quantity
- **Prevention**: Check item availability before adding to request
- **Error**: Item not found in dropdown
- **Prevention**: Verify employee has custody permissions for item

#### **Quantity and Period Errors**
- **Error**: Zero or negative quantity
- **Prevention**: Always enter positive quantity values
- **Error**: No period selected
- **Prevention**: Always select period for item need duration
- **Error**: Invalid date format
- **Prevention**: Use valid date format for period selection

#### **Request Management Errors**
- **Error**: No items added to request
- **Prevention**: Add at least one item before saving request
- **Error**: Request save fails
- **Prevention**: Ensure all required fields are filled
- **Error**: Request edit fails
- **Prevention**: Select valid request from history before editing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have custody administration permissions** via employee group assignments
3. **Employee must have custody item access** for dispensing operations
4. **Items must have available quantity** in selected store
5. **Items must have proper custody dispensing type** (fk_disp_type=7)

#### **Required System State**
- User authentication must be active
- Employee custody permissions must be configured
- Store access permissions must be configured
- Item inventory data must be current
- Custody dispensing workflow must be enabled

### Success Criteria

#### **For Employee and Store Selection**
- ✅ Employee dropdown populated with valid employees only
- ✅ Store dropdown populated with accessible stores only
- ✅ Employee validation prevents item addition without selection
- ✅ Store validation ensures proper employee-store association

#### **For Item Selection**
- ✅ Store dropdown populated with accessible stores only
- ✅ Item dropdown populated with custody items in selected store
- ✅ Item availability validation prevents selection of unavailable items
- ✅ Unit information automatically populated for selected item

#### **For Item Addition**
- ✅ Quantity validation ensures positive values only
- ✅ Period validation ensures valid date selection
- ✅ Item addition updates temporary items grid successfully
- ✅ Unit conversion calculations display properly

#### **For Request Management**
- ✅ Request save creates proper header and detail records
- ✅ Request edit updates existing records properly
- ✅ Request delete shows confirmation and processes correctly
- ✅ Request history displays all active requests for user

#### **For Data Management**
- ✅ Temporary items grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection and data state

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" Width="100%" ID="BootstrapFormLayout" dir="rtl" LayoutType="Vertical" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for custody requests

### Employee and Department Section

```html
<!-- Employee and Department Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderNO" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="OrderType" Text=" 7 -طلب صرف عهدة اصناف " ReadOnly="True"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الإدارة" Visible="false" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Store and Item Selection Section

```html
<!-- Store and Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="store" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="StoreDs" ValueField="code" TextField="arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Item" runat="server" TextFormatString="{0} - {1}" AutoPostBack="True" EnableMultiColumn="true" EnableCallbackMode="false" DataSourceID="ItemDS" ValueField="item_code" TextField="arabic_name" OnSelectedIndexChanged="Item_SelectedIndexChanged">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="item_code" />
                            <dx:BootstrapListBoxField FieldName="arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="DespenseType" Enabled="false" DataSourceID="DespenseTypeDS" TextField="english_name" ValueField="id" OnSelectedIndexChanged="DespenseType_SelectedIndexChanged" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Unit" ReadOnly="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" ID="Quentity" AllowMouseWheel="false"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" ID="Period" OnCalendarDayCellPrepared="Period_CalendarDayCellPrepared"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox ID="txtquantity" runat="server" Enabled="false"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة الصنف" ID="BTN_ADD" OnClick="BTN_ADD_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-plus" />
                    <SettingsBootstrap RenderOption="Info" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text="  تعديل الصنف" ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-note" />
                    <SettingsBootstrap RenderOption="Dark" />
                </dx:BootstrapButton>
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click" CssClasses-Control="cc">
                    <CssClasses Icon="simple-icon-trash" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Data Grids Section

```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" AutoPostBack="true" ClientInstanceName="tempItems" KeyFieldName="id" DataSourceID="TempItemsDS" OnSelectionChanged="tempItems_SelectionChanged" ShowHeaderWhenEmpty="True" runat="server" Width="100%" SettingsBehavior-AllowSelectSingleRowOnly="true" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discription" Caption="نوع الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="نوع الصنف" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="مدة الاحتياج" VisibleIndex="1"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="arabic_name" SummaryType="Count" DisplayFormat="عدد الاصناف =  {0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="كمية الاصناف =  {0 }" />
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

<!-- Request History Grid -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" AutoGenerateColumns="false" AutoPostBack="true" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" OnSelectionChanged="ItemsHisroy_SelectionChanged" KeyFieldName="id" DataSourceID="ItemHis">
                <Settings ShowFilterRow="true" ShowHeaderFilterButton="true" />
                <SettingsPager PageSize="6" Mode="ShowPager" NumericButtonCount="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Columns>
                    <dx:BootstrapGridViewCommandColumn ShowSelectCheckbox="True" VisibleIndex="0"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="OrderNo" Caption="رقم طلب الصرف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Date" Caption="التاريخ" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Time" Caption="الوقت" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp2" Caption=" الموظف" VisibleIndex="1"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="Emp" Caption=" الموظف" Visible="false"></dx:BootstrapGridViewDataColumn>
                    <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption=" المخزن"></dx:BootstrapGridViewDataColumn>
                </Columns>
                <SettingsDetail ShowDetailRow="true" AllowOnlyOneMasterRowExpanded="true" />
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <Templates>
                    <DetailRow>
                        <dx:BootstrapGridView ID="Detaiiils" runat="server" KeyFieldName="ID" DataSourceID="ItemHisDetails" OnBeforePerformDataSelect="Detaiiils_BeforePerformDataSelect">
                            <Columns>
                                <dx:BootstrapGridViewDataColumn FieldName="id" Caption="id" Visible="false"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Discription" Caption="نوع الصنف"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="UNIT" Caption="الوحدة"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Quntity" Caption="الكمية"></dx:BootstrapGridViewDataColumn>
                                <dx:BootstrapGridViewDataColumn FieldName="Due_Date" Caption="مدة الاحتياج"></dx:BootstrapGridViewDataColumn>
                            </Columns>
                            <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
                        </dx:BootstrapGridView>
                    </DetailRow>
                </Templates>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                <ClientSideEvents DetailRowCollapsing="MasterGrid_DetailRowCollapsing" EndCallback="MasterGrid_EndCallback" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Confirmation Popup

```html
<!-- Confirmation Popup -->
<dx:BootstrapPopupControl runat="server" ID="PatientType" SettingsBootstrap-Sizing="Large" Width="800" ShowCloseButton="true" Modal="true" HeaderText="تنبية" ClientInstanceName="popup" ShowHeader="true" ShowFooter="false" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" CloseAction="CloseButton">
    <SettingsAdaptivity Mode="OnWindowInnerWidth" />
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout ID="BootstrapFormLayout9" runat="server">
                <Items>
                    <dx:BootstrapLayoutGroup ShowCaption="false">
                        <CssClasses GroupContent="bg-light text-dark" />
                        <Items>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12" HorizontalAlign="Right">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:ASPxLabel ForeColor="Red" Font-Bold="true" Font-Size="Large" Text="هل انت متأكد من حذف طلب الصرف ؟" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:BootstrapButton runat="server" ID="Yes" OnClick="Yes_Click" Width="50%" Text="تأكيد الحذف">
                                            <SettingsBootstrap RenderOption="Success" />
                                        </dx:BootstrapButton>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                            <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="6">
                                <ContentCollection>
                                    <dx:ContentControl>
                                        <dx:BootstrapButton runat="server" ID="No" OnClick="No_Click" Width="50%" Text="إلغاء">
                                            <SettingsBootstrap RenderOption="Danger" />
                                        </dx:BootstrapButton>
                                    </dx:ContentControl>
                                </ContentCollection>
                            </dx:BootstrapLayoutItem>
                        </Items>
                    </dx:BootstrapLayoutGroup>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses user context and date parameters for comprehensive data filtering:

**User Context Parameters**:
- `@user` - Username for filtering temporary items
- `@date` - Date for filtering temporary records
- `@emp` - Employee code for filtering request history and item permissions

**Selection Parameters**:
- `@store` - Store ID for filtering available items
- `@FK_OrderID` - Order ID for filtering request details

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Employee Assignment**: Auto-populates employee information
3. **Store Selection**: Filters items based on selected store and employee permissions
4. **Item Selection**: Loads item details and unit information
5. **Item Addition**: Adds items to temporary request with validation
6. **Request Management**: Saves, edits, or deletes complete requests
7. **History Display**: Shows all active requests for user with details

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Sets minimum date for period control
3. Sets current date as default for period
4. Auto-populates employee information
5. Disables readonly fields appropriately
6. Sets default order type for custody requests

### Item_SelectedIndexChanged Method

```csharp
protected void Item_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads item details and unit information

**Process**:
1. Retrieves selected item code
2. Loads item type and unit information
3. Sets unit text box with proper unit description
4. Loads available quantity for item
5. Sets default quantity to 1

### BTN_ADD_Click Method

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary request with validation

**Process**:
1. Validates all required fields are filled
2. Validates quantity is greater than 0
3. Validates period date is selected
4. Checks item availability in store
5. Inserts item into temporary table
6. Refreshes temporary items grid
7. Clears form fields for next addition

### BTN_Save_Click Method

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete request with all items

**Process**:
1. Validates at least one item is added
2. Generates new order number
3. Inserts request header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BTN_Delete_Click Method

```csharp
protected void BTN_Delete_Click(object sender, EventArgs e)
```

**Purpose**: Shows confirmation popup for request deletion

**Process**:
1. Validates request selection from history
2. Shows confirmation popup
3. Waits for user confirmation
4. Processes deletion on confirmation

### Yes_Click Method

```csharp
protected void Yes_Click(object sender, EventArgs e)
```

**Purpose**: Confirms and processes request deletion

**Process**:
1. Retrieves selected request ID
2. Updates request status to inactive (Active=0)
3. Clears temporary tables
4. Refreshes all grids and controls
5. Hides confirmation popup
6. Provides success feedback

## Database Integration

### Core Database Tables

#### **Users**
- **Purpose**: User master data with employee codes
- **Key Fields**: Emp_Code, User_Name
- **Usage**: Provides user list for employee selection
- **Filtering**: Excludes system users ('0', '00')

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, active
- **Usage**: Provides store list for item selection
- **Filtering**: Active stores with procedure access

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with type associations
- **Key Fields**: item_code, arabic_name, Item_Type_id
- **Usage**: Provides item descriptions and types
- **Filtering**: Active items only

#### **Inventories_item_type**
- **Purpose**: Item type master data with dispensing rules
- **Key Fields**: id, english_name, active
- **Usage**: Categorizes items for dispensing workflow
- **Filtering**: Active types with proper dispensing rules

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Request header information with status tracking
- **Key Fields**: id, OrderNo, OrderType, Date, Time, Emp, Active, closed, Status, Approval
- **Usage**: Main request tracking and management
- **Filtering**: Active requests (Active=1, closed=0, Status='a', Approval=0)

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Request detail items with quantities and periods
- **Key Fields**: header_fk, item_code, Quntity, Due_Date
- **Usage**: Tracks items in each request
- **Relationships**: Links to request headers

#### **Inventories_Dispense_Request_Details_Temp**
- **Purpose**: Temporary item assignments for requests
- **Key Fields**: id, Item_Type_id, item_code, Quntity, Due_Date, username, date, Type
- **Usage**: Tracks items before request save
- **Relationships**: Links to temporary request workflow

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing request operations

#### **Employee Custody Permissions**
```sql
SELECT arabic_name, item_code FROM Inventories_Item_Settings 
WHERE (active = 1) and Item_Type_id in (
    SELECT distinct Inventories_item_type.id 
    FROM Inventories_item_type 
    inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type 
    inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id 
    where fk_disp_type = 7 
    and (Inventories_item_type.active = '1') 
    and item_level ='3' 
    and Inventories_rules_items_type.active=1 
    and Inventories_Dispens.active =1 
    and Inventories_rules_items_type.emp_id=@emp
)
```

**Permission Logic**: Filters items based on employee custody permissions
**Dispensing Type**: Only items with fk_disp_type=7 are available
**Employee Association**: Items must have employee-specific permissions

#### **Store Access Control**
```sql
SELECT WS.id as code,arabic_name
FROM Inventories_wharehouse_store WS 
WHERE (WS.active = 1) and WS.id in (select ws.id 
from Inventories_Procedures_Stores_DTL sd  
inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID  
inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code
where sd.Active =1 and sh.Setup_Procedure_FK = 3)
```

**Access Logic**: Filters stores based on procedure access permissions
**Permission Logic**: Only stores with Setup_Procedure_FK=3 are accessible
**Validation**: Ensures store is active and accessible

## Client-Side JavaScript

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

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Request Header Section**
```html
<!-- Request Header -->
<dx:BootstrapLayoutGroup ShowCaption="False" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم الطلب" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="نوع الطلب" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الإدارة" Visible="false" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="الموظف" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Store and Item Selection Section**
```html
<!-- Store and Item Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" ShowCaption="False">
    <Items>
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="المخزن">
        <dx:BootstrapLayoutItem ColSpanMd="12" Caption="الصنف">
        <dx:BootstrapLayoutItem Caption="نوع الصنف" ColSpanMd="12">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الوحدة">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="الكمية">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="مدة الاحتياج">
        <dx:BootstrapLayoutItem ColSpanMd="2" Caption="كمية الصنف">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutItem ColSpanMd="4" Caption=" ">
    <ContentCollection>
        <dx:ContentControl>
            <div style="float: left; color: white; background-color: white">
                <dx:BootstrapButton runat="server" Text="  اضافة الصنف" ID="BTN_ADD" OnClick="BTN_ADD_Click" CssClasses-Control="cc">
                <dx:BootstrapButton runat="server" Text="  تعديل الصنف" ID="BTN_Edit_Temp" OnClick="BTN_Edit_Temp_Click" CssClasses-Control="cc">
                <dx:BootstrapButton runat="server" Text=" حذف الصنف " ID="BTN_Delete_Temp" OnClick="BTN_Delete_Temp_Click" CssClasses-Control="cc">
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

#### **4. Data Grids Section**
```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="tempItems" runat="server" OnSelectionChanged="tempItems_SelectionChanged">
<!-- Request History Grid -->
<dx:BootstrapLayoutItem ShowCaption="false" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="ItemsHisroy" runat="server" OnSelectionChanged="ItemsHisroy_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Employee Data Source
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Emp_Code not in ('0','00')";

// Store Data Source
SqlDataSource StoreDs = new SqlDataSource();
StoreDs.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoreDs.SelectCommand = "SELECT WS.id as code,arabic_name FROM Inventories_wharehouse_store WS WHERE (WS.active = 1) and WS.id in (select ws.id from Inventories_Procedures_Stores_DTL sd inner join Inventories_Procedures_Stores_HD sh on sd.Setup_Procedure_Stores_FK =sh.ID inner join Inventories_wharehouse_store ws on ws.id = sd.Stores_Code where sd.Active =1 and sh.Setup_Procedure_FK = 3)";

// Item Data Source
SqlDataSource ItemDS = new SqlDataSource();
ItemDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemDS.SelectCommand = "SELECT arabic_name, item_code FROM Inventories_Item_Settings WHERE (active = 1) and Item_Type_id in (SELECT distinct Inventories_item_type.id FROM Inventories_item_type inner join Inventories_Dispens on Inventories_item_type.id = fk_item_type inner Join Inventories_rules_items_type on Inventories_rules_items_type.Items_Type_id = Inventories_item_type.id where fk_disp_type = 7 and (Inventories_item_type.active = '1') and item_level ='3' and Inventories_rules_items_type.active=1 and Inventories_Dispens.active =1 and Inventories_rules_items_type.emp_id=@emp)";

// Temporary Items Data Source
SqlDataSource TempItemsDS = new SqlDataSource();
TempItemsDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
TempItemsDS.SelectCommand = "SELECT Temp.Item_Type_id,Temp.id, IIS.arabic_name,ISett.arabic_name Discription,IIS.item_code, IIS.item_code, Quntity, Due_Date, username, date FROM Inventories_Dispense_Request_Details_Temp Temp inner join Inventories_Item_Settings IIS on IIS.item_code = Temp.item_code inner join Inventories_item_type ISett on ISett.id = Temp.Item_Type_id WHERE username = @user and date =@date and Type=7";

// Request History Data Source
SqlDataSource ItemHis = new SqlDataSource();
ItemHis.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
ItemHis.SelectCommand = "SELECT id, OrderNo, OrderType, Date, Time, (select User_Name from Users where Emp_Code=convert(nvarchar,Emp)) Emp2,Emp , Dep ,(select arabic_name from Inventories_wharehouse_store where id=store_id) as arabic_name FROM Inventories_Dispense_Request_Header where Emp=@emp and Active = 1 and OrderType=7 and Approval=0 and closed=0 and Status='a'";
```

## Business Logic and Validation

### Employee and Store Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (ResponsableEmp.Value == "" || ResponsableEmp.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الموظف');", true);
        return;
    }
    else if (store.Value == "" || store.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن');", true);
        return;
    }
    // ... additional validation
}
```

**Employee Logic**: Validates employee selection before item addition
**Store Logic**: Validates store selection before item selection
**Error Prevention**: Prevents item addition without proper employee and store context

### Item Availability Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Item.Value == "" || Item.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار الصنف');", true);
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection from available inventory
**Availability Logic**: Ensures items have sufficient quantity in selected store
**Error Prevention**: Prevents item addition without proper item selection

### Quantity and Period Validation

```csharp
protected void BTN_ADD_Click(object sender, EventArgs e)
{
    if (Quentity.Text == "" || Quentity.Text == null || Convert.ToInt32(Quentity.Text) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    else if (Period.Text == "" || Period.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال مدة الاحتياج');", true);
        return;
    }
    // ... additional validation
}
```

**Quantity Logic**: Validates quantity is positive and greater than 0
**Period Logic**: Validates period date is selected for item need duration
**Error Prevention**: Prevents item addition with invalid quantity or period

### Request Management Validation

```csharp
protected void BTN_Save_Click(object sender, EventArgs e)
{
    if (tempItems.VisibleRowCount == 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('لا يوجد اصناف مضافة');", true);
        return;
    }
    // ... save logic
}
```

**Request Logic**: Validates at least one item is added before saving request
**Empty Logic**: Prevents saving empty requests
**Error Prevention**: Ensures request has proper content before processing

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Employee Selection Validation**: Must select employee before adding items
- **Store Selection Validation**: Must select store before item selection
- **Item Selection Validation**: Must select item with available quantity
- **Quantity Validation**: Must enter positive quantity values
- **Period Validation**: Must select valid period date

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Employee Custody Validation**: Ensures employee has custody permissions for items
- **Store Access Validation**: Ensures user has access to selected store
- **Item Availability Validation**: Ensures items have sufficient quantity
- **Dispensing Type Validation**: Ensures items have proper custody dispensing rules

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Employee Access**: Ensures user has access to employee data
- **Store Access**: Ensures user has access to selected store
- **Request Access**: Ensures user can access and modify selected requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Item Deletion Success**: "تم حذف الصنف" (Item deleted successfully)
- **Request Save Success**: "تم حفظ الطلب" (Request saved successfully)
- **Request Edit Success**: "تم تعديل الطلب" (Request edited successfully)
- **Request Deletion Success**: "تم حذف الطلب" (Request deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of temporary items and request history grids
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Employee Management System**
- **Database Tables**:
  - `Users` - User master data with employee codes
- **Integration Details**:
  - Employee selection from user list
  - Employee custody permissions validation
  - Employee-based item filtering
- **Data Flow**:
  - Employee list from Users table
  - Employee custody permissions from rules tables
  - Employee-based item availability

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Warehouse store master data
  - `Inventories_Item_Settings` - Item master data with type associations
  - `Inventories_item_type` - Item type master data with dispensing rules
- **Integration Details**:
  - Store access controlled by procedure permissions
  - Item availability tracked with batch-level detail
  - Item types filtered by dispensing workflow rules
  - Quantity validation ensures sufficient inventory
- **Data Flow**:
  - Store list filtered by procedure access (Setup_Procedure_FK=3)
  - Item list filtered by store availability and dispensing type
  - Quantity validation prevents over-allocation
  - Item types validated for proper dispensing workflow

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - `Users` table with fields: Emp_Code, User_Name
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - Employee-based access control enforced at database level
  - User authentication required for all request operations
  - Employee auto-population based on user profile

### Data Exchange

#### **Employee and Custody Information**
- **Database Tables**:
  - `Users` - User master data with employee codes
  - `Inventories_rules_items_type` - Employee custody permissions
- **Real-time Data**:
  - Employee list with codes and names
  - Employee custody permissions for items
  - Employee-based item filtering
- **Data Relationships**:
  - Employee selection for request context
  - Employee custody permissions for item access
  - Employee-based item availability validation

#### **Store and Item Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data with access permissions
  - `Inventories_Item_Settings` - Item master data with type associations
- **Real-time Data**:
  - Store access permissions based on procedure assignments
  - Item availability with quantity tracking
  - Item type associations for dispensing workflow
- **Data Relationships**:
  - Store access controlled by procedure permissions
  - Item availability tracked by store and batch
  - Item types validated for proper dispensing rules

#### **Request Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Header` - Request header with status tracking
  - `Inventories_Dispense_Request_Details` - Request details with items and quantities
- **Real-time Data**:
  - Request status and workflow tracking
  - Item quantities and period requirements
  - Employee and store associations
- **Data Relationships**:
  - Request header linked to employee and store context
  - Request details linked to header with item allocations
  - Request filtering by employee and approval status

#### **Temporary Data Management**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details_Temp` - Temporary item assignments
- **Real-time Data**:
  - Temporary item assignments before request save
  - User and date-based filtering for temporary data
- **Data Relationships**:
  - Temporary items linked to user and date context
  - Temporary data cleared after request save or deletion

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار الموظف" Error**
- **Cause**: No employee selected before adding items
- **Solution**: Always select employee from dropdown before adding items
- **Prevention**: Employee selection is required for all item additions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: No store selected before item selection
- **Solution**: Select store from dropdown before selecting items
- **Prevention**: Store must have procedure access for dispensing

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: No item selected or item unavailable
- **Solution**: Select item from available items in selected store
- **Prevention**: Ensure employee has custody permissions for item

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Quantity not entered or zero/negative
- **Solution**: Enter positive quantity value
- **Prevention**: Quantity must be greater than 0

#### **"الرجاء ادخال مدة الاحتياج" Error**
- **Cause**: Period date not selected
- **Solution**: Select valid period date for item need duration
- **Prevention**: Period must be valid date for all items

#### **"لا يوجد اصناف مضافة" Error**
- **Cause**: No items added to request before saving
- **Solution**: Add at least one item before saving request
- **Prevention**: Request must have items before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Custody Administration Access**: Access to custody administration operations
- **Store Access**: Access to stores with procedure permissions
- **Item Access**: Access to items with proper custody dispensing rules

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Custody Administration Workflow**: Understanding of employee selection and store access
- **Inventory Management**: Knowledge of store access and item availability
- **Request Management**: Understanding of request save, edit, and delete operations

## Usage Examples

### Basic Custody Request Workflow

1. **Page Load**: Verify employee is auto-selected
2. **Store Selection**: Select store with procedure access
3. **Item Selection**: Select item with custody permissions
4. **Item Details**: Enter quantity and period for item
5. **Item Addition**: Click add button to add item to request
6. **Repeat Items**: Add additional items as needed
7. **Request Save**: Click save button to create complete request

### Request Management Workflow

1. **Request Creation**: Complete custody request with all items
2. **Request Save**: Save request to create header and details
3. **Request History**: Review saved requests in history grid
4. **Request Edit**: Select request and modify items if needed
5. **Request Deletion**: Select request and confirm deletion
6. **Request Tracking**: Monitor request status and workflow

### Item Management Workflow

1. **Item Addition**: Add items to temporary request
2. **Item Review**: Review items in temporary items grid
3. **Item Editing**: Select item and modify quantity or period
4. **Item Deletion**: Remove items from temporary request
5. **Item Validation**: Ensure all items have proper validation
6. **Request Completion**: Save request with all validated items
